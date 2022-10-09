import React, { Component } from "react";
import Posters from "./common/poster";

const MoviePoster = ({ movies }) => {
   return (
      <div className="flex flex--poster">
         {movies.map((movie) => (
            <Posters item={movie} key={movie._id} />
         ))}
      </div>
   );
};

export default MoviePoster;
