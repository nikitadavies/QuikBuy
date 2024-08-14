import * as api from "./utils";

/**
 * Fetches properties details
 */
export async function getProducts() {
    try {
      const response = await api.get("/buyer/products/");
      return response;
    } catch (error) {
      throw error;
    }
  }

  export async function getProduct(id) {
    try {
      const response = await api.get(`/buyer/product/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  }


  export async function createProducts(payload) {
    try {
      const response = await api.post("/seller/product", payload);
      return response;
    } catch (error) {
      console.error("eee", error);
      throw error;
    }
  }

  export async function placeOrder(payload) {
    try {
      const response = await api.post("/buyer/order", payload);
      return response;
    } catch (error) {
      console.error("eee", error);
      throw error;
    }
  }
