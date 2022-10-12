import http from "./httpService";
import config from "../config.json";

const apiEndpoint = `${config.apiEndpoint}/subscriptions`;

export function getSubscriptions() {
   return http.get(apiEndpoint);
}
