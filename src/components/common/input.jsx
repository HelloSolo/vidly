import React from "react";

const Input = ({ name, label, error, ...rest }) => {
   return (
      <div className="mb-3">
         <label htmlFor={name} className="form-label">
            {label}
         </label>
         <input
            type="text"
            name={name}
            className="form-control"
            id={name}
            {...rest}
         />
         {error && <div className="alert alert-danger">{error}</div>}
      </div>
   );
};

export default Input;
