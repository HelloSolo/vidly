import React from "react";
import { getImage } from "../utils/getImage";
import { NavLink } from "react-router-dom";

export default function Carousel({ items }) {
   return (
      <div
         id="carouselExampleCaptions"
         className="carousel slide carousel--custom"
         data-bs-ride="false">
         <div className="carousel-indicators">
            {items.map((item) => (
               <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"></button>
            ))}
         </div>

         {items.map((item) => (
            <div className="carousel-inner" key={item._id}>
               <div className="carousel-item active">
                  <img
                     src={getImage(item, item.images.length - 1)}
                     className="carousel__image"
                     alt="..."
                  />
                  <div className="vale"></div>
                  <div className="carousel-caption d-md-block">
                     <h5>{item.title}</h5>
                     <p>{item.description}</p>
                     <NavLink
                        className="btn btn-outline-info"
                        to={`/movies/${item._id}`}>
                        More Info
                     </NavLink>
                  </div>
               </div>
            </div>
         ))}

         <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev">
            <span
               className="carousel-control-prev-icon"
               aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
         </button>
         <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next">
            <span
               className="carousel-control-next-icon"
               aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
         </button>
      </div>
   );
}
