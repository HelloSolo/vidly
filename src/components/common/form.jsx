import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
   state = { data: {}, errors: {} };

   validateProperty = ({ name, value }) => {
      const fieldInputData = { [name]: value };
      const schema = Joi.object({ [name]: this.validationRules[name] });
      const { error } = schema.validate(fieldInputData);
      return error ? error.details[0].message : null;
   };

   validate = () => {
      const options = { abortEarly: false };
      const { error } = this.schema.validate(this.state.data, options);

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

      this.doSubmit();
   };

   handleChange = ({ currentTarget: input }) => {
      const errors = { ...this.state.errors };
      const errorMsg = this.validateProperty(input);
      if (errorMsg) errors[input.name] = errorMsg;
      else delete errors[input.name];

      const data = { ...this.state.data };
      data[input.name] = input.value;
      this.setState({ data, errors });
   };

   renderInput = (name, label, type = "text") => {
      const { data, errors } = this.state;
      return (
         <Input
            name={name}
            label={label}
            value={data[name]}
            onChange={this.handleChange}
            error={errors[name]}
            type={type}
         />
      );
   };

   renderSelect = (name, options, label) => {
      const { data, errors } = this.state;
      return (
         <Select
            name={name}
            options={options}
            value={data[name]}
            label={label}
            onChange={this.handleChange}
            error={errors[name]}
         />
      );
   };

   renderButton = (label) => {
      return (
         <button
            type="submit"
            className="btn btn-primary"
            disabled={this.validate()}
         >
            {label}
         </button>
      );
   };
}

export default Form;
