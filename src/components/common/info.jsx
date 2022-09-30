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
               <li>{movie.title}</li>
               <li>
                  <i className="fa fa-star-o" aria-hidden="true"></i>{" "}
                  {movie.imdbRating}
               </li>
               <li>
                  <span>Genre:</span> {}
               </li>
               <li>
                  <span>Release date:</span> {movie.releaseDate}
               </li>
            </ul>

            <div className="btn btn-secondary">
               <i className="fa fa-clock-o" aria-hidden="true"></i> Watch Later
            </div>
            <div className="btn btn-primary">
               <i class="fa fa-play" aria-hidden="true"></i> Watch Now
            </div>
         </div>
      </div>
   );
}
