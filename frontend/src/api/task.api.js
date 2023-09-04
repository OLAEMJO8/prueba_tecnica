import axios from "./axios";

export const createInvitacionRequest = (invitacion) =>
  axios.post("/invitacion", invitacion);
export const getInvitacionRequest = () => axios.get("/invitacion");

export const deleteInvitacion = (id) => {
  return axios.delete(`/invitacion/${id}`);
};

export const editarInvitacion = (id) => {
  return axios.get(`/invitacion/${id}`);
};

export const putInvitacion = (id, data) => {
  return axios.put(`/invitacion/${id}`, data);
};

