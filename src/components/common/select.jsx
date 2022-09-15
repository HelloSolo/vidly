import React from "react";

const Select = ({ name, options, label, selected, onSelect }) => {
   return (
      <div className="mb-3">
         <label htmlFor={name} className="form-label">
            {label}
         </label>
         <select
            className="form-select"
            id={name}
            onChange={onSelect}
            value={selected}
         >
            {options.map((option) => (
               <option key={option._id} value={option.name}>
                  {option.name}
               </option>
            ))}
         </select>
      </div>
   );
};

export default Select;
