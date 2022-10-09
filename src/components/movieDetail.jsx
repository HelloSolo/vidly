import React, { Component } from "react";
import _ from "lodash";
import auth from "../services/authService";
import {
   addMovieToWatchlist,
   getWatchList,
} from "../services/userWatchlistService";
import { getMovie } from "../services/movieService";
import { getBackgroundImage } from "./utils/getImage";
import ItemDescription from "./common/itemDescription";
import moveOneLevelUp from "./utils/moveALevelUp";

class MovieDetail extends Component {
   state = {
      movie: {},
      watchlist: [],
      disabled: false,
   };

   async popuplateMovie() {
      try {
         const movieId = this.props.match.params._id;
         const { data: movie } = await getMovie(movieId);
         this.setState({ movie });
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

   isMovieInWatchlist = (movie, watchlist) => {
      try {
         if (_.findIndex(watchlist, ["_id", movie._id]) > -1) {
            this.setState({ disabled: true });
         }
      } catch (error) {}
   };

   async componentDidMount() {
      const movie = await this.popuplateMovie();
      const watchlist = await this.populateWatchlist();

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
      const { movie } = this.state;

      const backgroundImage =
         "linear-gradient(180deg, rgba(252,252,252,0) 20%, rgba(5, 4, 16, 1) 100%), ";

      return (
         <div className="container-xxl section">
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
               disabled={this.state.disabled}
            />

            <div className="movie__desc">{movie.description}</div>

            <div>
               <h3>Photos</h3>
               <div></div>
            </div>
         </div>
      );
   }
}

export default MovieDetail;
