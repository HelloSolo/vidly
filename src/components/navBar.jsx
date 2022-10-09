import React from "react";
import { NavLink, Link } from "react-router-dom";

const NavBar = ({ user, onClickSearch, onClickHome }) => {
   return (
      <nav
         className="navbar navbar-expand-lg navbar--custom"
         // style={{ marginBottom: "0px" }}
      >
         <div className="container-fluid">
            <Link
               className="navbar-brand fw-bold fs-3 nav-link--custom"
               to="/movies"
               onClick={() => onClickHome()}>
               Vidly
            </Link>
            <button
               className="navbar-toggler nav-link--custom navbar-toggler--custom"
               type="button"
               data-bs-toggle="collapse"
               data-bs-target="#navbarNavAltMarkup"
               aria-controls="navbarNavAltMarkup"
               aria-expanded="false"
               aria-label="Toggle navigation">
               <span>
                  <i
                     className="fa fa-bars nav-toggler-text"
                     aria-hidden="true"></i>
               </span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
               <div className="navbar-nav">
                  <NavLink
                     className="nav-link nav-link--custom"
                     aria-current="page"
                     to="/movies"
                     onClick={() => onClickHome()}>
                     Movies
                  </NavLink>
                  <NavLink
                     className="nav-link nav-link--custom"
                     to="/movies"
                     onClick={() => onClickSearch()}>
                     Search
                  </NavLink>
                  {user && (
                     <NavLink
                        className="nav-link nav-link--custom"
                        to="/customers">
                        Watch Later
                     </NavLink>
                  )}
                  {user && (
                     <NavLink
                        className="nav-link nav-link--custom"
                        to="/customers">
                        Profile
                     </NavLink>
                  )}
                  {!user && (
                     <React.Fragment>
                        <NavLink
                           className="nav-link nav-link--custom"
                           to="/login">
                           Login
                        </NavLink>
                        <NavLink
                           className="nav-link nav-link--custom"
                           to="/register">
                           Register
                        </NavLink>
                     </React.Fragment>
                  )}
                  {user && (
                     <React.Fragment>
                        <NavLink
                           className="nav-link nav-link--custom"
                           to="/profile">
                           {user.first_name}
                        </NavLink>
                        <NavLink
                           className="nav-link nav-link--custom"
                           to="/logout">
                           Logout
                        </NavLink>
                     </React.Fragment>
                  )}
               </div>
            </div>
         </div>
      </nav>
   );
};

export default NavBar;
