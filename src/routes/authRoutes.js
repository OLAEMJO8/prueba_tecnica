import Router from "express-promise-router";
import {
  getPerfil,
  postLogin,
  postLogout,
  postSingin,
} from "../controllers/authController.js";
import { isAuth } from "../middlewares/auth.middlewares.js";
import { validateSchemas } from "../middlewares/validate.middlewares.js";
import { loginSchema, singinSchema } from "../schemas/auth.schemas.js";
const router = Router();
router.post("/login", validateSchemas(loginSchema), postLogin);
router.post("/signin", validateSchemas(singinSchema), postSingin);
router.post("/logout", postLogout);
router.get("/perfil", isAuth, getPerfil);

export default router;
