import { pool } from "../db.js";
import bcrypt from "bcrypt";
import { createToken } from "../utils/jwt.js";
import  jwt  from 'jsonwebtoken';
import nodemailer from 'nodemailer';
//!Registrarse
export const postLogin = async (req, res, next) => {
  const { name, lastname, email, password, numberdpto } = req.body;
  try {
    const hashesPassword = await bcrypt.hash(password, 15);
    const result = await pool.query(
      "INSERT INTO users ( name, lastname, email, password, numberdpto ) VALUES ($1, $2, $3, $4 ,$5) RETURNING *",
      [name, lastname, email, hashesPassword, numberdpto]
    );
    const token = await createToken({ id: result.rows[0].id });
    res.cookie("token", token, {
      //  httpOnly: true
      secure: true,
       sameSite: "none" });
    return res.json(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({ message: "El correo se encuentra en uso" });
    }
    next(error);
  }
};
//!Iniciar sesion
export const postSingin = async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  if (result.rowCount === 0) {
    {
      return res.status(400).json({ message: "El correo no esta registrado" });
    }
  }

  const validaPassword = await bcrypt.compare(
    password,
    result.rows[0].password
  );
  if (!validaPassword) {
    return res.status(400).json({ message: "La contraseña es incorrecta" });
  }

  const token = await createToken({ id: result.rows[0].id });

  res.cookie("token", token, {
    //  httpOnly: true
    secure: true,
    sameSite: "none",
  });
  return res.json(result.rows[0]);
};
//! Cerrar sesion
export const postLogout = (req, res) => {
  res.clearCookie("token");
  res.sendStatus(200);
};

//!Traer perfil
export const getPerfil = async (req, res) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [
    req.userId,
  ]);
  return res.json(result.rows[0]);
};

//! Controlador para solicitar la recuperación de contraseña
export const postRecovery = async (req, res, next) => {
  const { email } = req.body;
  try {
    // Verifica si el correo electrónico existe en la base de datos
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rowCount === 0) {
      return res.status(400).json({ message: 'El correo no está registrado' });
    }

    // Genera una contraseña aleatoria
    function generateRandomPassword(length) {
      const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let password = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
      }
      return password;
    }

    const newPassword = generateRandomPassword(10);

    // Actualiza la contraseña en la base de datos (opcional)
    const hashedPassword = await bcrypt.hash(newPassword, 15);
    await pool.query('UPDATE users SET password = $1 WHERE email = $2', [hashedPassword, email]);

    // Implementa el envío de correo electrónico con Nodemailer
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Reemplaza con tu servidor SMTP
      port: 465, // Puerto SMTP
      secure: true, 
      auth: {
        user: 'olaecheamariajose@gmail.com',
        pass: 'rlayqvhxphtgesfz',
      },
    });

    // Configura el correo electrónico
    const mailOptions = {
      from: 'olaecheamariajose@gmail.com',
      to: email,
      subject: 'Recuperación de Contraseña',
      text: `Tu nueva contraseña es: ${newPassword}`,
    };

    // Envía el correo electrónico
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Se ha enviado una nueva contraseña por correo electrónico' });
  } catch (error) {
    next(error);
  }
};


// Controlador para restablecer la contraseña
export const postResetPassword = async (req, res, next) => {
  const { email, password, token } = req.body;
  try {
    // Valida el token de recuperación de contraseña
    jwt.verify(token, 'tu_secreto_secreto', async (err, decoded) => {
      if (err) {
        return res.status(400).json({ message: 'Token de recuperación inválido o caducado' });
      }

      // Hash de la nueva contraseña
      const hashedPassword = await bcrypt.hash(password, 15);

      // Actualiza la contraseña en la base de datos
      await pool.query('UPDATE users SET password = $1 WHERE email = $2', [hashedPassword, email]);

      return res.status(200).json({ message: 'Contraseña restablecida con éxito' });
    });
  } catch (error) {
    next(error);
  }
};