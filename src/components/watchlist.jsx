import React, { Component } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import { setStyle } from "./utils/setStyle";
import {
   getWatchList,
   deleteMovieFromWatchlist,
} from "../services/userWatchlistService";
import { getMovies } from "../services/movieService";
import moveOneLevelUp from "./utils/moveALevelUp";
import Thumbnail from "./common/thumbnail";
import Table from "./common/table";

class WatchList extends Component {
   state = { watchlist: [], movies: [] };

   populateWatchList = async () => {
      const { data: watchlist } = await getWatchList();
      this.setState({ watchlist });
   };

   populateMovies = async () => {
      const { data: cache } = await getMovies();
      const { data: watchlist } = await getWatchList();
      const movieId = moveOneLevelUp(watchlist);

      let movies = [];
      movieId.forEach((item) => {
         movies.push(_.find(cache, ["_id", item]));
      });

      this.setState({ movies });
   };

   async componentDidMount() {
      setStyle();
      this.populateWatchList();
      this.populateMovies();
   }

   onDelete = async (watchListItem) => {
      const { watchlist: backupWatchlist, movies: backupMovies } = this.state;

      watchListItem =
         backupWatchlist[
            _.findIndex(backupWatchlist, ["movie", watchListItem._id])
         ];

      const watchlist = backupWatchlist.filter(
         (element) => element.id != watchListItem.id
      );

      const movies = backupMovies.filter(
         (element) => element._id != watchListItem.movie
      );

      this.setState({ watchlist, movies });

      try {
         await deleteMovieFromWatchlist(watchListItem.id);
      } catch (error) {
         this.setState({ watchlist: backupWatchlist, movies: backupMovies });
         toast.error("Unable to delete");
      }
   };

   columns = [
      {
         path: "",
         label: "",
         key: "movies",
         content: (movie) => (
            <div className="d-flex thumbnail">
               <Thumbnail item={movie} className="p-2" />
               <div className="p-2">
                  <span className="thumbnail__title">{movie.title}</span>
                  <br />
                  <span className="thumbnail__genre">{movie.genre.name}</span>
               </div>
            </div>
         ),
      },

      {
         key: "delete",
         content: (item) => (
            <button
               className="btn btn-danger btn-sm"
               onClick={() => this.onDelete(item)}>
               Delete
            </button>
         ),
      },
   ];

   render() {
      const { movies } = this.state;
      return (
         <div className="container-sm">
            <h1>Movies</h1>
            <Table
               data={movies}
               columns={this.columns}
               onSort={() => null}
               sortColumn={() => null}
            />
         </div>
      );
   }
}

export default WatchList;
