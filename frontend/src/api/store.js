import * as api from "./utils";

export async function createStore(payload) {
    try {
      const response = await api.post("/seller/store", payload);
      return response;
    } catch (error) {
      console.error("eee", error);
      throw error;
    }
  }

  export async function getStores() {
    try {
      const response = await api.get("/seller/store");
      return response;
    } catch (error) {
      throw error;
    }
  }