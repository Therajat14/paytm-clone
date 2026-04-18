import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

// attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});

// detect 401 globally
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      // remove invalid token
      localStorage.removeItem("token");

      // notify app
      window.dispatchEvent(new Event("unauthorized"));
    }

    return Promise.reject(error);
  },
);

export default api;
