import React from "react";
import Joi from "joi-browser";
import _ from "lodash";
import Form from "./common/form";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
   state = {
      data: { title: "", numberInStock: "", dailyRentalRate: "", genreId: "" },
      errors: {},
      genres: [],
   };

   validationRules = {
      _id: Joi.string(),
      title: Joi.string().required().label("Title"),
      numberInStock: Joi.number()
         .min(0)
         .max(100)
         .required()
         .label("Number in Stock"),
      dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
      genreId: Joi.string().required().label("Genre"),
   };

   schema = Joi.object(this.validationRules);

   componentDidMount() {
      const genres = getGenres();
      this.setState({ genres });

      const movieId = this.props.match.params._id;
      if (movieId === "new") return;

      const movie = getMovie(movieId);
      if (!movie) return this.props.history.replace("/not-found");

      this.setState({ data: this.mapToViewModel(movie) });
   }

   mapToViewModel(movie) {
      return {
         _id: movie._id,
         title: movie.title,
         genreId: movie.genre._id,
         numberInStock: movie.numberInStock,
         dailyRentalRate: movie.dailyRentalRate,
      };
   }

   doSubmit = () => {
      saveMovie(this.state.data);
      this.props.history.push("/movies");
   };

   render() {
      return (
         <div>
            <h1>Movie Form</h1>
            <form onSubmit={this.handleSubmit}>
               {this.renderInput("title", "Title")}
               {this.renderSelect("genreId", this.state.genres, "Genre")}
               {this.renderInput("numberInStock", "Number in Stock", "number")}
               {this.renderInput("dailyRentalRate", "Rate")}
               {this.renderButton("Save")}
            </form>
         </div>
      );
   }
}

export default MovieForm;
