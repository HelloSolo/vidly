import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import auth from "../services/authService";
import { register } from "../services/userService";
import { NavLink } from "react-router-dom";

class RegisterForm extends Form {
   state = {
      data: { username: "", password: "", name: "" },
      errors: {},
   };

   validationRules = {
      username: Joi.string().email().required().label("Username"),
      password: Joi.string().min(8).required().label("Password"),
      name: Joi.string().required().label("Name"),
   };

   schema = Joi.object(this.validationRules);

   doSubmit = async () => {
      try {
         await register(this.state.data);
         const { username, password } = this.state.data;
         await auth.login(username, password);
         window.location = "/";
      } catch (error) {
         if (error.response && error.response.status === 400) {
            const errors = { ...this.state.errors };

            await error.response.data;

            if ("username" in error.response.data) {
               errors.username = error.response.data.username[0];
            } else {
               errors.password = error.response.data.password.join();
            }

            this.setState({ errors });
         }
      }
   };

   render() {
      return (
         <div className="auth-container">
            <form onSubmit={this.handleSubmit} className="form--custom">
               <h1>Getting Started</h1>
               {this.renderInput("username", "", "email", "input", "Email")}
               {this.renderInput(
                  "password",
                  "",
                  "password",
                  "input",
                  "Password"
               )}
               {this.renderInput("name", "", "", "input", "Name")}
               {this.renderButton("Register", "")}
               <p className="signin">
                  Already have an account? <NavLink to="/login">login</NavLink>
               </p>
            </form>
         </div>
      );
   }
}

export default RegisterForm;
