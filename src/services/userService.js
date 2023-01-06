import http from "./httpService";

const apiEndpoint = `/users/`;

export function register(user) {
   return http.post(apiEndpoint, {
      username: user.username,
      password: user.password,
      name: user.name,
   });
}

export function getUser() {
   return http.get(`${apiEndpoint}me`);
}
