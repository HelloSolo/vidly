import React from "react";
import Posters from "./common/poster";

const MoviePoster = ({ movies, onClick }) => {
   return (
      <div className="flex flex--poster">
         {movies.map((movie) => (
            <Posters item={movie} key={movie._id} onClick={() => onClick()} />
         ))}
      </div>
   );
};

export default MoviePoster;
