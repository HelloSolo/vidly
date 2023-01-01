import React, { Component } from "react";
import auth from "../services/authService";
import {
   addMovieToWatchlist,
   getWatchList,
} from "../services/userWatchlistService";
import { getMovie, getMovies } from "../services/movieService";
import { getBackgroundImage } from "./utils/getImage";
import MoviePoster from "./moviePoster";
import ItemDescription from "./common/itemDescription";
import moveOneLevelUp from "./utils/moveALevelUp";
import _ from "lodash";

class MovieDetail extends Component {
   state = {
      similarMovies: [],
      movie: {},
      watchlist: [],
      disabled: false,
      movie_id: 0,
   };

   async popuplateMovie() {
      try {
         const movie_id = this.props.location.pathname.slice(8);

         const { data: movie } = await getMovie(movie_id);

         this.setState({ movie, movie_id });

         return movie;
      } catch (error) {
         if (error.response && error.response.status === 404)
            this.props.history.replace("/not-found");
      }
   }

   async populateWatchlist() {
      try {
         const { data } = await getWatchList();
         const watchlist = moveOneLevelUp(data);
         this.setState({ watchlist });
         return watchlist;
      } catch (error) {}
   }

   async populateSimilarMovies() {
      try {
         const { data: movies } = await getMovies();

         let similarMovies = [];

         movies.forEach((movie) => {
            if (
               movie.genre._id === this.state.movie.genre._id &&
               movie._id !== this.state.movie._id
            ) {
               similarMovies.push(movie);
            }
         });

         this.setState({ similarMovies });
      } catch (error) {}
   }

   isMovieInWatchlist = (movie, watchlist) => {
      try {
         if (watchlist.includes(movie._id)) {
            this.setState({ disabled: true });
         }
      } catch (error) {}
   };

   async componentDidMount() {
      const movie = await this.popuplateMovie();
      const watchlist = await this.populateWatchlist();
      await this.populateSimilarMovies();

      this.isMovieInWatchlist(movie, watchlist);
   }

   handleWatchList = async (movieId) => {
      if (!auth.getCurrentUser()) {
         localStorage.setItem("from", `/movies/${movieId}`);
         window.location = "/login";
         return;
      }

      await addMovieToWatchlist(movieId);
      this.setState({ disabled: true });
   };

   render() {
      const { movie, disabled, movie_id } = this.state;

      const backgroundImage =
         "linear-gradient(180deg, rgba(252,252,252,0) 20%, rgba(5, 4, 16, 1) 100%), ";

      return (
         <div className="container-xxl section container-xxl--custom">
            <div
               className="movie__cover"
               style={{
                  backgroundImage: `${backgroundImage}${getBackgroundImage(
                     movie,
                     1
                  )}`,
               }}></div>

            <ItemDescription
               movie={movie}
               onClick={this.handleWatchList}
               disabled={disabled}
            />

            <div className="movie__desc">
               <h5 className="mb-3 fw-bold">About this Movies</h5>
               <p className="fs-6">{movie.description}</p>
            </div>

            <div className="px-2">
               <h5 className="mb-0 fw-bold">Similar Movies</h5>
               <hr />
               <MoviePoster
                  movies={this.state.similarMovies}
                  onClick={this.handleMovieIdUpdate}
               />
            </div>
         </div>
      );
   }
}

export default MovieDetail;
