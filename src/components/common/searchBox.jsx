import React from "react";

const SearchBox = ({ onChange, value }) => {
   return (
      <input
         type="text"
         name="query"
         className="form-control mb-3"
         placeholder="Search..."
         value={value}
         onChange={(e) => onChange(e.currentTarget.value)}
      />
   );
};

export default SearchBox;
