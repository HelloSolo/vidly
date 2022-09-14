import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";

class Register extends Form {
   state = {
      data: { username: "", password: "", name: "" },
      errors: {},
   };

   validationRules = {
      username: Joi.string().email().required().label("Username"),
      password: Joi.string().min(3).required().label("Password"),
      name: Joi.string().required().label("Password"),
   };

   render() {
      return (
         <form>
            {this.renderInput("username", "Username", "email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderInput("name", "Name")}
            {this.renderButton("Register")}
         </form>
      );
   }
}

export default Register;
