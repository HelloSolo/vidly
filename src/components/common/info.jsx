import React from "react";
import { getImage } from "../utils/getImage";

export default function MovieDescription({ movie }) {
   return (
      <div className="grid grid--1x2 movie__details">
         <div className="movie__banner">
            <img src={getImage(movie, 0)} className="image"></img>
         </div>
         <div className="movie__info">
            <ul className="list">
               <li>
                  <span className="movie__title">{movie.title}</span>
               </li>
               <li>
                  <span className="movie__rating">
                     <i className="fa fa-star yellow" aria-hidden="true"></i>{" "}
                     {movie.imdbRating}
                  </span>
                  /10
               </li>
               <li>
                  <span className="dt">Genre:</span> {}
               </li>
               <li>
                  <span className="dt">Release Date : </span>{" "}
                  {movie.releaseDate}{" "}
                  <i class="fa fa-calendar" aria-hidden="true"></i>
               </li>
            </ul>

            <div className="btn btn-secondary">
               <i className="fa fa-clock-o" aria-hidden="true"></i> Watch Later
            </div>
            <p></p>
            <div className="btn btn-primary">
               <i class="fa fa-play" aria-hidden="true"></i> Watch Now
            </div>
         </div>
      </div>
   );
}
