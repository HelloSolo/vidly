import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
   state = {
      account: { username: "", password: "" },
      errors: {},
   };

   handleSubmit = (e) => {
      e.preventDefault();

      const errors = this.validate();
      this.setState({ errors: errors || {} });
      if (errors) return;

      // Call to Server
      console.log("Submitted");
   };

   handleChange = ({ currentTarget: input }) => {
      const errors = { ...this.state.errors };
      const errorMsg = this.validate(input);
      if (errorMsg) errors[input.name] = errorMsg;
      else delete errors[input.name];

      const account = { ...this.state.account };
      account[input.name] = input.value;
      this.setState({ account, errors });
   };

   validate = () => {
      const errors = {};

      const { account } = this.state;
      if (account.username.trim() === "")
         errors.username = "Username is required";
      if (account.password.trim() === "")
         errors.password = "Password is required";

      return Object.keys(errors).length ? errors : null;
   };

   validateProperty = ({ name, value }) => {
      if (name === "username") {
         if (value.trim() === "") return "Username is reqiured";
      }
      if (name === "password") {
         if (value.trim() === "") return "Password is reqiured";
      }
      return null;
   };

   render() {
      const { account, errors } = this.state;
      return (
         <div>
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
               <Input
                  name="username"
                  label="Username"
                  value={account.username}
                  onChange={this.handleChange}
                  autoFocus={true}
                  error={errors.username}
               />

               <Input
                  name="password"
                  label="Password"
                  value={account.password}
                  onChange={this.handleChange}
                  error={errors.password}
               />

               <button type="submit" className="btn btn-primary">
                  Submit
               </button>
            </form>
         </div>
      );
   }
}

export default LoginForm;
