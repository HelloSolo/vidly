import React, { Component } from "react";
import _ from "lodash";
import { paginate } from "./utils/paginate";
import { getGenres } from "../services/genreService";
import { getMovies } from "../services/movieService";
import { setStyle } from "./utils/setStyle";
import SearchBox from "./common/searchBox";
import Pagination from "./common/pagination";
import MoviePoster from "./moviePoster";
import Select from "./common/select";
import MovieSlide from "./movieSlides";

export default class Movies extends Component {
   state = {
      movies: [],
      genres: [],
      pageSize: 12,
      currentPage: 1,
      selectedGenre: "",
      searchQuery: "",
      promoted: [],
   };

   async componentDidMount() {
      const { data } = await getGenres();
      const genres = [{ _id: "", name: "All Genres" }, ...data];

      const { data: movies } = await getMovies();
      this.setState({ movies, genres });

      const promoted = movies.filter((movie) => movie.promoted);
      this.setState({ promoted });

      setStyle("main", "margin-top: 0rem");
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
      const { pageSize, currentPage, selectedGenre, searchQuery, promoted } =
         this.state;
      const { displaySearchBar } = this.props;

      const { totalCount, data: movies } = this.getPagedData();

      if (displaySearchBar) setStyle();

      if (count === 0) return <p>There are no movies in the database</p>;

      return (
         <React.Fragment>
            {!displaySearchBar && (
               <div className="carousel--custom">
                  <MovieSlide movie={promoted} />
               </div>
            )}
            <div className="container-sm">
               <div className="row">
                  <div className="col-4">
                     <Select
                        name="genres"
                        options={this.state.genres}
                        value={selectedGenre}
                        placeholder="Select Genre"
                        onChange={(e) => this.handleGenreSelect(e)}
                     />
                  </div>
                  {displaySearchBar && (
                     <div className="col">
                        <SearchBox
                           onChange={this.handleSearch}
                           value={searchQuery}
                        />
                     </div>
                  )}
               </div>
               <MoviePoster movies={movies} />
               <Pagination
                  onPageChange={this.handlePageChange}
                  itemsCount={totalCount}
                  pageSize={pageSize}
                  currentPage={currentPage}
               />
            </div>
         </React.Fragment>
      );
   }
}
