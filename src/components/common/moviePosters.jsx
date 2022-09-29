import React from "react";
import { NavLink } from "react-router-dom";

export default function MoviePosters({ movies }) {
   function getImage(movie) {
      try {
         const url = movie.images[0].image;
         return `, url(${url})`;
      } catch (error) {
         return "";
      }
   }

   const backgroundImage =
      "linear-gradient(180deg, rgba(252,252,252,0) 55%, rgba(0,0,0,1) 100%)";

   return (
      <div className="flex flex--poster">
         {movies.map((movie) => (
            <div
               className="poster"
               style={{
                  backgroundImage: `${backgroundImage}${getImage(movie)}`,
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
