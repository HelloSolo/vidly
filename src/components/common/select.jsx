import React from "react";

const Select = ({ name, options, label, error, placeholder, ...rest }) => {
   return (
      <div className="mb-3">
         {label && (
            <label htmlFor={name} className="form-label">
               {label}
            </label>
         )}
         <select className="form-select" id={name} name={name} {...rest}>
            <option value="">{placeholder}</option>
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
