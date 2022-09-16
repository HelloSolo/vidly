import React from "react";

const Select = ({ name, options, label, error, ...rest }) => {
   return (
      <div className="mb-3">
         <label htmlFor={name} className="form-label">
            {label}
         </label>
         <select className="form-select" id={name} name={name} {...rest}>
            <option value="" />
            {options.map((option) => (
               <option key={option._id} value={option._id}>
                  {option.name}
               </option>
            ))}
         </select>
         {error && <div className="alert alert-danger">{error}</div>}
      </div>
   );
};

export default Select;
