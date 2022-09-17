import http from "./httpService";
import config from "../config.json";

export async function getMovies() {
   const { data: movies } = await http.get(`${config.apiEndpoint}movies`);
   return movies;
}
