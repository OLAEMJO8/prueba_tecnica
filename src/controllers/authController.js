import { pool } from "../db.js";
import bcrypt from "bcrypt";
import { createToken } from "../utils/jwt.js";
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
