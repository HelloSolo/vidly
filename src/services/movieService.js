import http from "./httpService";

const apiEndpoint = `/movies`;

export function getMovies() {
   return http.get(apiEndpoint);
}

export function getMovie(movieId) {
   return http.get(`${apiEndpoint}/${movieId}`);
}
