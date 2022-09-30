import React from "react";
import { Link } from "react-router-dom";
import { getImage } from "../utils/getImage";

export default function MovieDescription({ movie, onClick }) {
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

            <button
               className="btn btn-secondary"
               onClick={() => onClick(movie._id)}>
               <i className="fa fa-clock-o" aria-hidden="true"></i> Watch Later
            </button>
            <p></p>
            <Link className="btn btn-primary" to="/not-found">
               <i class="fa fa-play" aria-hidden="true"></i> Watch Now
            </Link>
         </div>
      </div>
   );
}
