import React from "react";
import Form from "./common/form";
import { getMovie } from "../services/movieService";
import MovieDescription from "./common/info";
import getImage from "./utils/getImage";

class MovieForm extends Form {
   state = {
      movie: {},
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

   render() {
      const { movie } = this.state;

      const backgroundImage =
         "linear-gradient(180deg, rgba(252,252,252,0) 55%, rgba(0,0,0,1) 100%), ";

      return (
         <div>
            <div
               className="movie__cover"
               style={{
                  backgroundImage: `${backgroundImage}${getImage(movie, 1)}`,
               }}></div>

            <MovieDescription movie={movie} />

            <div className="movie__desc">{movie.description}</div>
         </div>
      );
   }
}

export default MovieForm;
