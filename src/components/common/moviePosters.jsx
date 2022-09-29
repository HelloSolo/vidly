import React from "react";
import { NavLink } from "react-router-dom";
import getImage from "../utils/getImage";

export default function MoviePosters({ movies }) {
   const backgroundImage =
      "linear-gradient(180deg, rgba(252,252,252,0) 55%, rgba(0,0,0,1) 100%)";

   return (
      <div className="flex flex--poster">
         {movies.map((movie) => (
            <div
               className="poster"
               style={{
                  backgroundImage: `${backgroundImage}${getImage(movie, 0)}`,
               }}
               key={movie._id}>
               <NavLink
                  className="flex flex--center play"
                  to={`/movies/${movie._id}`}>
                  <i
                     className="fa fa-play-circle play__icon"
                     aria-hidden="true"></i>
               </NavLink>
               <div className="poster__title">{movie.title}</div>
               <div className="flex">
                  <div className="poster__genre">{movie.genre.name}</div>
                  <div>
                     <span className="poster__badge poster__badge--primary">
                        {`${movie.imdbRating} / 10`}
                     </span>
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
}
