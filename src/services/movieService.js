import http from "./httpService";
import config from "../config.json";

const apiEndpoint = `${config.apiEndpoint}/movies`;

export function getMovies() {
   return http.get(apiEndpoint);
}

export function getMovie(movieId) {
   return http.get(`${apiEndpoint}/${movieId}`);
}
