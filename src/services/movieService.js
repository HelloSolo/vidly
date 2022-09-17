import http from "./httpService";
import config from "../config.json";

const apiEndpoint = `${config.apiEndpoint}/movies`;

export async function getMovies() {
   const { data: movies } = await http.get(apiEndpoint);
   return movies;
}

export async function deleteMovie(movieId) {
   return await http.delete(`${apiEndpoint}/${movieId}`);
}
