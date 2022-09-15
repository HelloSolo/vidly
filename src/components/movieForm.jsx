import React from "react";
import Joi from "joi-browser";
import _ from "lodash";
import Form from "./common/form";
import { genres, getGenres } from "../services/fakeGenreService";
import { getMovie, getMovies, saveMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
   state = {
      data: { title: "", numberInStock: "", dailyRentalRate: "", genre: "" },
      errors: {},
      genres: [],
      _id: "",
   };

   componentDidMount() {
      const _id = this.props.match.params._id;
      const movie = getMovie(_id);
      const genres = getGenres();

      if (_id !== undefined) {
         if (!movie) {
            this.props.history.push("/not-found");
         }
      }

      let data = { ...this.state.data };

      if (movie) {
         const { title, numberInStock, dailyRentalRate, genre } = movie;
         data = {
            title,
            numberInStock,
            dailyRentalRate,
            genre: genre.name,
         };
      } else {
         data.genre = genres[0].name;
      }

      this.setState({ genres, data, _id });
   }

   validationRules = {
      title: Joi.string().required().label("Title"),
      numberInStock: Joi.number()
         .min(0)
         .max(100)
         .required()
         .label("Number in Stock"),
      dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
      genre: Joi.string(),
   };

   schema = Joi.object(this.validationRules);

   doSubmit = () => {
      const { genres, _id } = this.state;

      let data = { ...this.state.data };
      data.genre = genres[_.findIndex(genres, ["name", data.genre])];
      if (_id) data._id = _id;

      saveMovie(data);
      this.props.history.push("/movies");
   };

   render() {
      return (
         <div>
            <h1>Movie Form</h1>
            <form onSubmit={this.handleSubmit}>
               {this.renderInput("title", "Title")}
               {this.renderSelect("genre", this.state.genres, "Genre")}
               {this.renderInput("numberInStock", "Number in Stock", "number")}
               {this.renderInput("dailyRentalRate", "Rate")}
               {this.renderButton("Save")}
            </form>
         </div>
      );
   }
}

export default MovieForm;
