import http from "./httpService";

const apiEndpoint = `/watchlists`;

export function addMovieToWatchlist(movieId) {
   return http.post(`${apiEndpoint}/`, { movie: movieId });
}

export function getWatchList() {
   return http.get(apiEndpoint);
}

export function deleteMovieFromWatchlist(itemId) {
   return http.delete(`${apiEndpoint}/${itemId}`);
}
