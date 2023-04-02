import axios from "axios";

const newRequest = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export default newRequest;
