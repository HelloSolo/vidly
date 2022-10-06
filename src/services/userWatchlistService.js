import http from "./httpService";
import config from "../config.json";

const apiEndpoint = `${config.apiEndpoint}/watchlists`;

export function addToWatchlist(movieId) {
   return http.post(`${apiEndpoint}/`, { movie: movieId });
}

export function getWatchList() {
   return http.get(apiEndpoint);
}

export function deleteWatchlist(watchlistId) {
   return http.delete(watchlistId);
}
