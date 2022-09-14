import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./common/input";

class LoginForm extends Component {
   state = {
      account: { username: "", password: "" },
      errors: {},
   };

   validationRules = {
      username: Joi.string().required().label("Username"),
      password: Joi.string().required().label("Password"),
   };

   schema = Joi.object(this.validationRules);

   validateProperty = ({ name, value }) => {
      const fieldInputData = { [name]: value };
      const schema = Joi.object({ [name]: this.validationRules[name] });
      const { error } = schema.validate(fieldInputData);
      return error ? error.details[0].message : null;
   };

   validate = () => {
      const options = { abortEarly: false };
      const { error } = this.schema.validate(this.state.account, options);

      if (!error) return null;

      const errors = {};
      error.details.map((item) => (errors[item.path[0]] = item.message));
      return errors;
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
      const errorMsg = this.validateProperty(input);
      if (errorMsg) errors[input.name] = errorMsg;
      else delete errors[input.name];

      const account = { ...this.state.account };
      account[input.name] = input.value;
      this.setState({ account, errors });
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

               <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={this.validate()}
               >
                  Submit
               </button>
            </form>
         </div>
      );
   }
}

export default LoginForm;
