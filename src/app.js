import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser"; // Leer cookie de Header
import invitacionesRoutes from "./routes/invitacionesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import { ORIGIN } from "./config.js";
import path from "path"; 

const app = express();

app.use(cors({ origin: ORIGIN, credentials: true }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//* Rutas api
app.use("/api", invitacionesRoutes);
app.use("/api", authRoutes);


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

export default app;

