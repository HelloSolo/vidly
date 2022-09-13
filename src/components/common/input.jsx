import React from "react";

const Input = ({ name, label, value, onChange, autoFocus }) => {
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
      </div>
   );
};

export default Input;
