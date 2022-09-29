import React from "react";
import getImage from "../utils/getImage";

export default function MovieDescription({ movie }) {
   return (
      <div className="row movie__details">
         <div
            className="col-md movie__banner"
            style={{
               backgroundImage: `${getImage(movie, 0)}`,
            }}></div>
         <div className="col movie__info">
            <ul></ul>
         </div>
         <div className="button"></div>
         <div className="button"></div>
         <div className="button"></div>
      </div>
   );
}
