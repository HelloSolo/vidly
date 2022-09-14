import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";

class MovieForm extends Form {
   state = {
      data: { title: "", numberInStock: "", rate: "" },
      errors: {},
   };

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
      this.props.history.push("/movies");
   };

   render() {
      return (
         <div>
            <h1>Movie Form</h1>
            <form onSubmit={this.handleSubmit}>
               {this.renderInput("title", "Title")}
               {/* {this.renderInput("genre", "Genre", "select")} */}
               {this.renderInput("numberInStock", "Number in Stock", "number")}
               {this.renderInput("rate", "Rate")}
               {this.renderButton("Save")}
            </form>
         </div>
      );
   }
}

export default MovieForm;
