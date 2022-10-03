import React from "react";

const SearchBox = ({ onChange, value }) => {
   return (
      <input
         type="text"
         name="query"
         className="form-control form-control--custom"
         placeholder="Search..."
         value={value}
         onChange={(e) => onChange(e.currentTarget.value)}
      />
   );
};

export default SearchBox;
