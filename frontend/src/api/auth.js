import * as api from "./utils";

/**
 * API for user login
 */

export async function login(payload) {
    try {
      const response = await api.post("/auth/login", payload);
      return response;
    } catch (error) {
      throw error;
    }
  }

  export async function register(payload) {
    try {
      const response = await api.post("/auth/register", payload);
      return response;
    } catch (error) {
      throw error;
    }
  }

  export async function confirmCode(payload) {
    try {
      const response = await api.post("/auth/confirm", payload);
      return response;
    } catch (error) {
      throw error;
    }
  }

  export async function getUserDetails(emailId) {
    try {
      const response = await api.get(`/auth/users/${emailId}`);
      return response;
    } catch (error) {
      throw error;
    }
  }