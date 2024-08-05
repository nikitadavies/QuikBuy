import * as productApi from "./products";
import * as authApi from "./auth";
import * as store from "./store";

const api = {
  product: productApi,
  auth: authApi,
  store: store
};

export default api;