import React from "react";
import Form from "./common/form";
import { getMovie } from "../services/movieService";
import MovieDescription from "./common/info";
import { getBackgroundImage } from "./utils/getImage";
import setBackground from "./utils/setBackground";

class MovieForm extends Form {
   state = {
      movie: {},
      customer: {},
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

   async componentDidMount() {
      await this.popuplateMovie();
   }

   handleWatchList = (movieId) => {
      console.log(movieId);
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

            <MovieDescription movie={movie} onClick={this.handleWatchList} />

            <div className="movie__desc">{movie.description}</div>

            <div>
               <h3>Photos</h3>
               <div></div>
            </div>
         </div>
      );
   }
}

export default MovieForm;
