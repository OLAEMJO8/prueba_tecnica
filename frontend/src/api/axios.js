import axios from "axios";

// Url api
const client = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials:true
});
export default client;
