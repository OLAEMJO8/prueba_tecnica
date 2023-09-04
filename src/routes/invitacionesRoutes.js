import Router from "express-promise-router";
import {
  deleteInvitacion,
  getInvitacion,
  getInvitaciones,
  postInvitacion,
  putInvitacion,
} from "./../controllers/invitacionesController.js";
import { isAuth } from "../middlewares/auth.middlewares.js";
const router = Router();
import {validateSchemas} from "../middlewares/validate.middlewares.js"
import { createInvitacionSchema, editarInvitacionSchema } from "../schemas/invitacion.schemas.js";
router.get("/invitacion", isAuth, getInvitaciones);
router.get("/invitacion/:id", isAuth, getInvitacion);
router.post("/invitacion", isAuth,validateSchemas(createInvitacionSchema), postInvitacion);
router.put("/invitacion/:id", isAuth,validateSchemas(editarInvitacionSchema),putInvitacion);
router.delete("/invitacion/:id", isAuth, deleteInvitacion);

export default router;
