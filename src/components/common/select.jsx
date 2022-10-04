import React from "react";

const Select = ({ name, options, label, error, placeholder, ...rest }) => {
   return (
      <div className="mb-3">
         {label && (
            <label htmlFor={name} className="form-label">
               {label}
            </label>
         )}
         <select
            className="form-select form-control--custom"
            id={name}
            name={name}
            {...rest}>
            {options.map((option) => (
               <option key={option._id} value={option.name}>
                  {option.name}
               </option>
            ))}
         </select>
         {error && <div className="alert alert-danger">{error}</div>}
      </div>
   );
};

export default Select;
