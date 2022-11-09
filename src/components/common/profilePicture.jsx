import React from "react";

export default function ProfilePicture({ picture, name, username }) {
   return (
      <React.Fragment>
         <div className="flex flex--center profile__photo">
            <span className="fs-3">{picture}</span>
         </div>
         <div className="profile__info">{name}</div>
         <div className="profile__info ">{username}</div>
      </React.Fragment>
   );
}
