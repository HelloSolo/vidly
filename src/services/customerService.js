import http from "./httpService";
import config from "../config.json";

const apiEndpoint = `${config.apiEndpoint}/`;

export function updateCustomer(subscriptionType) {
   return http.post(apiEndpoint, {
      subscriptionType,
   });
}

export function getCustomer() {
   return http.get(`${apiEndpoint}customers/me`);
}
