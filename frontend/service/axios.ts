"use client";

import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
//   baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Attach token from browser cookies
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
