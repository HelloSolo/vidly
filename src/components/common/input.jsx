import React from "react";

const Input = ({ name, label, error, className, ...rest }) => {
   return (
      <div className="mb-3">
         {label && (
            <label htmlFor={name} className="form-label">
               {label}
            </label>
         )}
         <input
            type="text"
            name={name}
            className={className ? className : "form-control"}
            id={name}
            {...rest}
         />
         {error && <div className="alert alert-danger">{error}</div>}
      </div>
   );
};

export default Input;
