import React from "react";
import Joi from "joi-browser";
import { NavLink, Redirect } from "react-router-dom";
import setBackground from "./utils/setBackground";
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

         const from = localStorage.getItem("from");
         console.log(from);
         localStorage.removeItem("from");

         window.location = state ? state.from.pathname : from ? from : "/";
      } catch (error) {
         if (error.response && error.response.status === 401) {
            const errors = { ...this.state.errors };
            errors.username = "Invalid Username or Password";
            this.setState({ errors });
         }
      }
   };

   render() {
      setBackground("background-color: #050410; color: #eee");
      if (auth.getCurrentUser()) return <Redirect to="/" />;

      return (
         <div className="auth-container">
            <form onSubmit={this.handleSubmit} className="form--custom">
               <h1>Please sign in</h1>
               {this.renderInput("username", "", "email", "input", "Username")}
               {this.renderInput(
                  "password",
                  "",
                  "password",
                  "input",
                  "Password"
               )}
               {this.renderButton("Login", "btn-login")}
               <p className="signin">
                  New Here? <NavLink to="/register">Create an account</NavLink>
               </p>
            </form>
         </div>
      );
   }
}

export default LoginForm;
