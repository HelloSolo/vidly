import http from "./httpService";

const apiEndpoint = `/customers/me`;

export function updateCustomer(user_id, subscription) {
   return http.put(apiEndpoint + "/", { user_id, subscription });
}

export function getCustomer() {
   return http.get(`${apiEndpoint}`);
}
