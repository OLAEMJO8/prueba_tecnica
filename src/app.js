// Express Servidor
import express from "express";
import morgan from "morgan";
import invitacionesRoutes from "./routes/invitacionesRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import cors from "cors";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//* Rutas api
app.use("/api",invitacionesRoutes)
app.use("/api",authRoutes)


app.use(cors());

export default app;
