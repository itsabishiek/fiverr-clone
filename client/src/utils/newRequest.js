import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://fiverr-6nv1.onrender.com/api",
  withCredentials: true,
});

export default newRequest;
