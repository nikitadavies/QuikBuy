import * as api from "./utils";

/**
 * API for user login
 */

export async function login(payload) {
    try {
      const response = await api.post("/auth/login", payload);
      return response;
    } catch (error) {
      console.error("eee", error);
      throw error;
    }
  }