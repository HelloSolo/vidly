import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";
import { getMovies } from "../services/fakeMovieService";

class MovieForm extends Form {
   state = {
      data: { title: "", numberInStock: "", rate: "" },
      errors: {},
      genres: [],
      movies: [],
   };

   componentDidMount() {
      const genres = getGenres();
      const movies = getMovies();
      this.setState({ movies, genres });
   }

   validationRules = {
      title: Joi.string().required().label("Title"),
      numberInStock: Joi.number()
         .min(0)
         .max(100)
         .required()
         .label("Number in Stock"),
      rate: Joi.number().min(0).max(10).required().label("Rate"),
   };

   schema = Joi.object(this.validationRules);

   doSubmit = () => {
      console.log(this.state.data);
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
               {this.renderInput("rate", "Rate")}
               {this.renderButton("Save")}
            </form>
         </div>
      );
   }
}

export default MovieForm;
