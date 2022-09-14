import React from "react";

const Input = ({ name, label, value, error, onChange, autoFocus }) => {
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
            value={value}
            onChange={onChange}
            autoFocus={autoFocus}
         />
         {error && <div className="alert alert-danger">{error}</div>}
      </div>
   );
};

export default Input;
