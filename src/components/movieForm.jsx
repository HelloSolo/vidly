import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";
import { toast } from "react-toastify";

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

   async popuplateGenre() {
      const { data: genres } = await getGenres();
      this.setState({ genres });
   }

   async popuplateMovie() {
      try {
         const movieId = this.props.match.params._id;
         if (movieId === "new") return;

         const { data: movie } = await getMovie(movieId);
         this.setState({ data: this.mapToViewModel(movie) });
      } catch (error) {
         if (error.response && error.response.status === 404)
            this.props.history.replace("/not-found");
      }
   }

   async componentDidMount() {
      await this.popuplateGenre();
      await this.popuplateMovie();
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

   doSubmit = async () => {
      let movie = { ...this.state.data };
      try {
         await saveMovie(movie);
         this.props.history.push("/movies");
      } catch (error) {
         toast.error("Unable to save");
      }
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
