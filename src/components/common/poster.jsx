import React from "react";
import { NavLink } from "react-router-dom";

export default function Posters({ item, onClick }) {
   function getImage(item) {
      try {
         const url = item.images[0].image;
         return `, url(${url})`;
      } catch (error) {
         return "";
      }
   }

   const backgroundImage =
      "linear-gradient(180deg, rgba(252,252,252,0) 55%, rgba(0,0,0,1) 100%)";

   const genre = item.genre;

   return (
      <div
         className="section poster"
         style={{
            backgroundImage: `${backgroundImage}${getImage(item)}`,
         }}
         key={item._id}>
         <NavLink
            className="flex flex--center play"
            to={`/movies/${item._id}`}
            onClick={() => onClick()}>
            <i className="fa fa-play-circle play__icon" aria-hidden="true"></i>
         </NavLink>
         <div className="poster__title">{item.title}</div>
         <div className="flex">
            <div className="poster__genre">{genre.name}</div>
            <div>
               <span className="poster__badge poster__badge--primary">
                  {`${item.imdbRating} / 10`}
               </span>
            </div>
         </div>
      </div>
   );
}
