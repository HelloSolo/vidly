import http from "./httpService";

const apiEndpoint = `/subscriptions`;

export function getSubscriptions() {
   return http.get(apiEndpoint);
}
