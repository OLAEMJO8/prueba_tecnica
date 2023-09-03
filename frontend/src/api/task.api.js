import axios from "./axios";

export const createInvitacionRequest = (invitacion)=> axios.post("/invitacion", invitacion)