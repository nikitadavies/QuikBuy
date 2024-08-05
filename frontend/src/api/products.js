import * as api from "./utils";

/**
 * Fetches properties details
 */
export async function getProducts() {
    try {
      const response = await api.get("/products/");
      return response;
    } catch (error) {
      throw error;
    }
  }


