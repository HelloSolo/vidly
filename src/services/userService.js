import http from "./httpService";
import config from "../config.json";

// const apiEndpoint = `${config.apiEndpoint}/users`;
const apiEndpoint = `${config.registerEndpoint}/`;

export function register(user) {
   return http.post(apiEndpoint, {
      username: user.username,
      password: user.password,
      name: user.name,
   });
}
