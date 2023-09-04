import { pool } from "../db.js";
import moment from "moment";

export const getInvitaciones = async (req, res, next) => {
  const result = await pool.query(
    "SELECT * FROM invitacion WHERE user_id = $1",
    [req.userId]
  );

  return res.json(result.rows);
};

export const getInvitacion = async (req, res) => {
  const result = await pool.query("SELECT * FROM invitacion WHERE id = $1", [
    req.params.id,
  ]);
  if (result.rows.length === 0) {
    return res.status(404).json({ message: "La tarea no existe" });
  }
  return res.json(result.rows[0]);
};


export const postInvitacion = async (req, res) => {
  const { name, timein, timeout } = req.body;

  // Formatea las fechas usando moment
  const formattedTimein = moment(timein).format("YYYY-MM-DD HH:mm:ss");
  const formattedTimeout = moment(timeout).format("YYYY-MM-DD HH:mm:ss");

  try {
    const result = await pool.query(
      "INSERT INTO invitacion (name, timein, timeout, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, formattedTimein, formattedTimeout, req.userId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res
        .status(409)
        .json({ message: "Usuario ya invitado, selecciona otro nombre" });
    }
  }
};

export const putInvitacion = async (req, res) => {
  const id = req.params.id;
  const { name, timein, timeout } = req.body;

  const result = await pool.query(
    "UPDATE invitacion SET name = $1, timein = $2, timeout =$3 WHERE id =$4 RETURNING *",
    [name, timein, timeout, id]
  );
  if (result.rowCount === 0) {
    return res.status(404).json({ message: "No existe esa invitacion" });
  }

  return res.json(result.rows[0]);
};

export const deleteInvitacion = async (req, res) => {
  const result = await pool.query(
    "DELETE FROM invitacion WHERE id = $1 RETURNING *",
    [req.params.id]
  );

  // console.log(result);

  if (result.rowCount === 0) {
    return res.status(404).json({ message: "No existe esa invitacion" });
  }

  return res.sendStatus(204);
};
