import React from "react";
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";
import auth from "../services/authService";
import Form from "./common/form";

class LoginForm extends Form {
   state = {
      data: { username: "", password: "" },
      errors: {},
   };

   validationRules = {
      username: Joi.string().required().label("Username"),
      password: Joi.string().required().label("Password"),
   };

   schema = Joi.object(this.validationRules);

   doSubmit = async () => {
      try {
         const { username, password } = this.state.data;
         await auth.login(username, password);
         const { state } = this.props.location;
         window.location = state ? state.from.pathname : "/";
      } catch (error) {
         if (error.response && error.response.status === 400) {
            const errors = { ...this.state.errors };
            errors.username = error.response.data;
            this.setState({ errors });
         }
      }
   };

   render() {
      if (auth.getCurrentUser()) return <Redirect to="/" />;

      return (
         <div>
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
               {this.renderInput("username", "Username")}
               {this.renderInput("password", "Password", "password")}
               {this.renderButton("Login")}
            </form>
         </div>
      );
   }
}

export default LoginForm;
