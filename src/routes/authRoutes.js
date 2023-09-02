import Router from "express-promise-router";
import {
  getPerfil,
  postLogin,
  postLogout,
  postSingin,
} from "../controllers/authController.js";

const router = Router();
router.post("/login", postLogin);
router.post("/signin", postSingin);
router.post("/logout", postLogout);
router.get("/perfil", getPerfil);

export default router;
