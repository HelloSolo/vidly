import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { paginate } from "./utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import { getMovies } from "../services/fakeMovieService";
import _ from "lodash";

import "./css/movies.css";

class Movies extends Component {
   state = {
      movies: [],
      genres: [],
      pageSize: 4,
      currentPage: 1,
      selectedGenre: "",
      sortColumn: { path: "title", order: "asc" },
   };

   componentDidMount() {
      const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
      this.setState({ movies: getMovies(), genres });
   }

   handleDelete = (movie) => {
      const movies = this.state.movies.filter((m) => m._id != movie._id);
      this.setState({ movies });
   };

   handleLike = (movie) => {
      const movies = [...this.state.movies];
      const index = movies.indexOf(movie);
      movies[index] = { ...movie };
      movies[index].liked = !movies[index].liked;
      this.setState({ movies });
   };

   handlePageChange = (page) => {
      this.setState({ currentPage: page });
   };

   handleGenreSelect = (genre) => {
      this.setState({ selectedGenre: genre, currentPage: 1 });
   };

   handleSort = (sortColumn) => {
      this.setState({ sortColumn });
   };

   render() {
      const {
         pageSize,
         currentPage,
         selectedGenre,
         sortColumn,
         movies: allMovies,
      } = this.state;

      const filtered =
         selectedGenre && selectedGenre._id
            ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
            : allMovies;

      const sorted = _.orderBy(filtered, sortColumn.path, sortColumn.order);

      const movies = paginate(sorted, currentPage, pageSize);

      let { length: count } = filtered;

      if (count === 0) return <p>There are no movies in the database</p>;

      return (
         <div className="row">
            <div className="col-2">
               <ListGroup
                  items={this.state.genres}
                  selectedItem={selectedGenre}
                  onItemSelect={this.handleGenreSelect}
               />
            </div>
            <div className="col">
               <p>Showing {count} movies in the database</p>
               <MoviesTable
                  movies={movies}
                  onLike={this.handleLike}
                  onSort={this.handleSort}
                  sortColumn={sortColumn}
                  onDelete={this.handleDelete}
               />
               <Pagination
                  onPageChange={this.handlePageChange}
                  itemsCount={count}
                  pageSize={pageSize}
                  currentPage={currentPage}
               />
            </div>
         </div>
      );
   }
}

export default Movies;
