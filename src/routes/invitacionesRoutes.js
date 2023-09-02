import Router from "express-promise-router";
import { deleteInvitacion, getInvitacion, getInvitaciones, postInvitacion, putInvitacion } from './../controllers/invitacionesController.js';

const router = Router();

router.get("/invitaciones", getInvitaciones);
router.get("/invitaciones/:id", getInvitacion);
router.post("/invitaciones", postInvitacion);
router.put("/invitaciones/:id", putInvitacion);
router.delete("/invitaciones/:id", deleteInvitacion);

export default router;
