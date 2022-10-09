import React from "react";
import { getImage } from "../utils/getImage";

export default function Thumbnail({ item }) {
   return (
      <div className="thumbnail--container">
         <img
            src={`${getImage(item, 1)}`}
            className="image image__thumbnail img-thumbnail"
            alt="..."
         />
      </div>
   );
}
