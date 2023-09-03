import axios from "./axios";

export const createInvitacionRequest = (invitacion) =>
  axios.post("/invitacion", invitacion);
  export const getInvitacionRequest = () =>
  axios.get("/invitacion");