import axios from "axios";

const BASE_URL = "http://localhost:4000/api/";

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

// userRequest.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     // Check if the error is related to authentication
//     if (error.response.status === 401 || error.response.status === 403) {
//       // If the error is related to authentication, log the user out and redirect to login page
//       localStorage.removeItem("persist:root");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );
