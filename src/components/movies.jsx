import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { paginate } from "./utils/paginate";
import { getGenres } from "../services/genreService";
import { getMovies } from "../services/movieService";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";

class Movies extends Component {
   state = {
      movies: [],
      genres: [],
      pageSize: 4,
      currentPage: 1,
      selectedGenre: null,
      searchQuery: "",
      sortColumn: { path: "title", order: "asc" },
   };

   async componentDidMount() {
      const genres = [{ _id: "", name: "All Genres" }, ...(await getGenres())];
      this.setState({ movies: await getMovies(), genres });
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
      this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" });
   };

   handleSort = (sortColumn) => {
      this.setState({ sortColumn });
   };

   handleSearch = (query) => {
      this.setState({
         selectedGenre: null,
         currentPage: 1,
         searchQuery: query,
      });
   };

   getPagedData = () => {
      const {
         pageSize,
         currentPage,
         selectedGenre,
         sortColumn,
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
      } else if (selectedGenre && selectedGenre._id) {
         filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);
      }

      const sorted = _.orderBy(filtered, sortColumn.path, sortColumn.order);

      const data = paginate(sorted, currentPage, pageSize);

      return { totalCount: filtered.length, data };
   };

   render() {
      const count = this.state.movies;
      const { pageSize, currentPage, selectedGenre, sortColumn, searchQuery } =
         this.state;

      const { totalCount, data: movies } = this.getPagedData();

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
               <Link className="btn btn-primary mb-3" to="/movies/new">
                  New Movie
               </Link>
               <p>Showing {totalCount} movies in the database</p>
               <SearchBox onChange={this.handleSearch} value={searchQuery} />

               <MoviesTable
                  movies={movies}
                  onLike={this.handleLike}
                  onDelete={this.handleDelete}
                  onSort={this.handleSort}
                  sortColumn={sortColumn}
               />
               <Pagination
                  onPageChange={this.handlePageChange}
                  itemsCount={totalCount}
                  pageSize={pageSize}
                  currentPage={currentPage}
               />
            </div>
         </div>
      );
   }
}

export default Movies;
