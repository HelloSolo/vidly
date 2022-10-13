import http from "./httpService";
import config from "../config.json";

const apiEndpoint = `${config.apiEndpoint}/customers/me`;

export function updateCustomer(user_id, subscription) {
   return http.put(apiEndpoint + "/", { user_id, subscription });
}

export function getCustomer() {
   return http.get(`${apiEndpoint}`);
}
