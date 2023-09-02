// Express Servidor
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser"; //Leer cookie de Header
import invitacionesRoutes from "./routes/invitacionesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

const app = express();

app.use(cors({  origin: "http://localhost:5173", credentials: true }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//* Rutas api
app.use("/api", invitacionesRoutes);
app.use("/api", authRoutes);

export default app;
