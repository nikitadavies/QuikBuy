import axios from "axios";

const API_BASE_URL = 'http://Quikbuy-backend-lb-2123908312.us-east-1.elb.amazonaws.com:8000/api';
// const API_BASE_URL = 'http://localhost:8000/api';


// Create an instance of Axios with base URL and default headers
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


// Interceptor to add Authorization header with token from localStorage to each request
api.interceptors.request.use(
  (config) => {
    const token = localStorage?.getItem("token");
    if (token && token != "undefined") {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// handle successful response
const handleResponse = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
};

// handle errors in HTTP requests
const handleError = (error) => {
  console.error(error?.response?.status);
  if (error?.response?.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
  }
  throw error;
};

export const get = async (url, params = {}) => {
  try {
    const response = await api.get(url, { params });
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const post = async (url, data = {}) => {
  try {
    const response = await api.post(url, data);
    return handleResponse(response);
  } catch (error) {
    console.log("in error", error);
    handleError(error);
  }
};

export const put = async (url, data = {}) => {
  try {
    const response = await api.put(url, data);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const del = async (url) => {
  try {
    const response = await api.delete(url);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};
