import React, { Component } from "react";
import _ from "lodash";
import { paginate } from "./utils/paginate";
import { getGenres } from "../services/genreService";
import { getMovies } from "../services/movieService";
import setBackground from "./utils/setBackground";
import SearchBox from "./common/searchBox";
import Pagination from "./common/pagination";
import Posters from "./common/poster";
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
      setBackground("background-color: #050410; color: #eee");
      const count = this.state.movies;
      const { pageSize, currentPage, selectedGenre, searchQuery, promoted } =
         this.state;

      const { totalCount, data: movies } = this.getPagedData();

      if (count === 0) return <p>There are no movies in the database</p>;

      return (
         <React.Fragment>
            <div className="carousel--custom">
               <MovieSlide movie={promoted} />
            </div>
            <div className="container-sm">
               {/* <p>Showing {totalCount} movies in the database</p> */}
               <div className="col-4">
                  <Select
                     name="genres"
                     options={this.state.genres}
                     value={selectedGenre}
                     placeholder="Select Genre"
                     onChange={(e) => this.handleGenreSelect(e)}
                  />
               </div>
               <Posters movies={movies} />
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
