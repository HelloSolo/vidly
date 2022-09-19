import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { register } from "../services/userService";

class RegisterForm extends Form {
   state = {
      data: { username: "", password: "", name: "" },
      errors: {},
   };

   validationRules = {
      username: Joi.string().email().required().label("Username"),
      password: Joi.string().min(5).required().label("Password"),
      name: Joi.string().required().label("Name"),
   };

   schema = Joi.object(this.validationRules);

   doSubmit = async () => {
      try {
         await register(this.state.data);
      } catch (error) {
         if (error.response && error.response.status === 400) {
            const errors = { ...this.state.errors };
            errors.username = error.response.data;
            this.setState({ errors });
         }
      }
   };

   render() {
      return (
         <form onSubmit={this.handleSubmit}>
            {this.renderInput("username", "Username", "email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderInput("name", "Name")}
            {this.renderButton("Register")}
         </form>
      );
   }
}

export default RegisterForm;
