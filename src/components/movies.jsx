import React, { Component } from "react";
import _ from "lodash";
import { paginate } from "./utils/paginate";
import { getGenres } from "../services/genreService";
import { getMovies } from "../services/movieService";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";
import Pagination from "./common/pagination";
import MoviePosters from "./common/moviePosters";
import Select from "./common/select";

export default class Movies extends Component {
   state = {
      movies: [],
      genres: [],
      pageSize: 12,
      currentPage: 1,
      selectedGenre: "",
      searchQuery: "",
   };

   async componentDidMount() {
      const { data } = await getGenres();
      const genres = [{ _id: "", name: "All Genres" }, ...data];

      const { data: movies } = await getMovies();
      this.setState({ movies, genres });
   }

   handlePageChange = (page) => {
      this.setState({ currentPage: page });
   };

   handleGenreSelect = ({ currentTarget: input }) => {
      this.setState({
         selectedGenre: input.value,
         currentPage: 1,
         searchQuery: "",
      });
   };

   handleSearch = (query) => {
      this.setState({
         selectedGenre: "",
         currentPage: 1,
         searchQuery: query,
      });
   };

   getPagedData = () => {
      const {
         pageSize,
         currentPage,
         selectedGenre,
         searchQuery,
         movies: allMovies,
      } = this.state;

      let filtered = allMovies;

      if (searchQuery) {
         filtered = allMovies.filter((movie) => {
            return movie.title
               .toLowerCase()
               .includes(searchQuery.toLowerCase());
         });
      } else if (selectedGenre !== "") {
         const { genres } = this.state;
         const index = _.findIndex(genres, ["name", selectedGenre]);
         filtered =
            index === 0
               ? allMovies
               : allMovies.filter((m) => m.genre._id === genres[index]._id);
      }

      const data = paginate(filtered, currentPage, pageSize);

      return { totalCount: filtered.length, data };
   };

   render() {
      const count = this.state.movies;
      const { pageSize, currentPage, selectedGenre, searchQuery } = this.state;

      const user = this.props.user;

      const { totalCount, data: movies } = this.getPagedData();

      if (count === 0) return <p>There are no movies in the database</p>;

      return (
         <div className="container-sm">
            <p>Showing {totalCount} movies in the database</p>

            <div className="row">
               <div className="col">
                  <Select
                     name="genres"
                     options={this.state.genres}
                     value={selectedGenre}
                     placeholder="Select Genre"
                     onChange={(e) => this.handleGenreSelect(e)}
                  />
               </div>
               <div className="col">
                  <SearchBox onChange={this.handleSearch} value={searchQuery} />
               </div>
            </div>

            <MoviePosters movies={movies} />

            <Pagination
               onPageChange={this.handlePageChange}
               itemsCount={totalCount}
               pageSize={pageSize}
               currentPage={currentPage}
            />
         </div>
      );
   }
}
