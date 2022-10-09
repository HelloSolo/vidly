import http from "./httpService";
import config from "../config.json";

const apiEndpoint = `${config.apiEndpoint}/watchlists`;

export function addMovieToWatchlist(movieId) {
   return http.post(`${apiEndpoint}/`, { movie: movieId });
}

export function getWatchList() {
   return http.get(apiEndpoint);
}

export function deleteMovieFromWatchlist(movieId) {
   return http.delete(movieId);
}
