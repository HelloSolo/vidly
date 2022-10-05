import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import auth from "../services/authService";
import setBackground from "./utils/setBackground";
import { register } from "../services/userService";
import { NavLink } from "react-router-dom";

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
         const { username, password } = this.state.data;
         await auth.login(username, password);
         window.location = "/";
      } catch (error) {
         if (error.response && error.response.status === 400) {
            const errors = { ...this.state.errors };
            errors.username = error.response.data.username[0];
            this.setState({ errors });
         }
      }
   };

   render() {
      setBackground("background-color: #050410; color: #eee");
      return (
         <div className="auth-container">
            <form onSubmit={this.handleSubmit} className="form--custom">
               <h1>Getting Started</h1>
               {this.renderInput("username", "", "email", "input", "Username")}
               {this.renderInput(
                  "password",
                  "",
                  "password",
                  "input",
                  "Password"
               )}
               {this.renderInput("name", "", "", "input", "Name")}
               {this.renderButton("Register")}
               <p className="signin">
                  Already have an account? <NavLink to="/login">login</NavLink>
               </p>
            </form>
         </div>
      );
   }
}

export default RegisterForm;
