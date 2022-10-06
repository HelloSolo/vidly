import React, { Component } from "react";
import _ from "lodash";
import auth from "../services/authService";
import { addToWatchlist, getWatchList } from "../services/userWatchlistService";
import { getMovie } from "../services/movieService";
import { getBackgroundImage } from "./utils/getImage";
import setBackground from "./utils/setBackground";
import MovieDescription from "./common/info";

class MovieDetail extends Component {
   state = {
      movie: {},
      watchlist: {},
      disabled: false,
   };

   async popuplateMovie() {
      try {
         const movieId = this.props.match.params._id;
         const { data: movie } = await getMovie(movieId);
         this.setState({ movie });
      } catch (error) {
         if (error.response && error.response.status === 404)
            this.props.history.replace("/not-found");
      }
   }

   async popuplateWatchlist() {
      try {
         const { data: watchlist } = await getWatchList();
         this.setState({ watchlist });
      } catch (error) {}
   }

   async componentDidMount() {
      await this.popuplateMovie();
      await this.popuplateWatchlist();
      this.inWatchlist();
   }

   inWatchlist = () => {
      const moviesInWatchList = [];
      const { movie, watchlist } = this.state;

      try {
         watchlist.forEach((element) => {
            moviesInWatchList.push(element.movie);
         });
         if (_.findIndex(moviesInWatchList, ["_id", movie._id]) > -1) {
            this.setState({ disabled: true });
         } else {
            this.setState({ disabled: false });
         }
      } catch (error) {}
      console.log(watchlist);
   };

   handleWatchList = async (movieId) => {
      if (!auth.getCurrentUser()) {
         localStorage.setItem("from", `/movies/${movieId}`);
         window.location = "/login";
         return;
      }
      const { data: movie } = await addToWatchlist(movieId);
      console.log(movie);
      this.inWatchlist();
   };

   render() {
      setBackground("background-color: #050410; color: #eee");
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

            <MovieDescription
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
