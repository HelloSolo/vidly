import React from "react";
import { Link } from "react-router-dom";
import { getImage } from "../utils/getImage";

export default function ItemDescription({ movie: item, onClick, disabled }) {
   return (
      <div className="grid grid--1x2 movie__details">
         <div className="movie__banner">
            <img
               src={getImage(item, 0)}
               className="image"
               alt="movie_poster"></img>
         </div>
         <div className="movie__info">
            <ul className="list">
               <li>
                  <span className="movie__title">{item.title}</span>
               </li>
               <li>
                  <span className="movie__rating">
                     <i className="fa fa-star yellow" aria-hidden="true"></i>{" "}
                     {item.imdbRating}
                  </span>
                  /10
               </li>
               <li>
                  <span className="dt">Genre:</span> {}
               </li>
               <li>
                  <span className="dt">Release Date : </span> {item.releaseDate}{" "}
                  <i className="fa fa-calendar" aria-hidden="true"></i>
               </li>
            </ul>

            <button
               className="btn btn-secondary"
               disabled={disabled}
               onClick={() => onClick(item._id)}>
               {!disabled ? (
                  <i className="fa fa-clock-o" aria-hidden="true"></i>
               ) : (
                  <i className="fa fa-check" aria-hidden="true"></i>
               )}{" "}
               Watch Later
            </button>
            <p></p>
            <Link className="btn btn-primary" to="/not-found">
               <i className="fa fa-play" aria-hidden="true"></i> Watch Now
            </Link>
         </div>
      </div>
   );
}
