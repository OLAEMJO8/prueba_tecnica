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

router.get("/invitacion", isAuth, getInvitaciones);
router.get("/invitacion/:id", isAuth, getInvitacion);
router.post("/invitacion", isAuth, postInvitacion);
router.put("/invitacion/:id", isAuth, putInvitacion);
router.delete("/invitacion/:id", isAuth, deleteInvitacion);

export default router;
