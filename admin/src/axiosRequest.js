import axios from "axios";

const BASE_URL = "https://e-commerce-api-fhbj.onrender.com/api/";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const token = currentUser?.accesstoken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    common: {
      ...(token && { token: `Bearer ${token}` }),
    },
  },
});
