import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // For web/iOS, use localhost; for Android emulator use 10.0.2.2
});

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const createDeal = (data) => API.post("/deals", data);
export const getDeals = () => API.get("/deals");
