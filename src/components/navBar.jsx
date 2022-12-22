import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";

const NavBar = ({ user, onClickSearch, onClickHome }) => {
   const [navBar, setNavBar] = useState("collapse navbar-collapse");

   useEffect(() => {
      setNavBar("collapse navbar-collapse");
   });

   const onClickLink = (func) => {
      let nav = document.getElementById("navbarNavAltMarkup");
      setNavBar(nav.className);
      onClickSearch();
      if (func) {
         func();
      }
      return;
   };

   return (
      <nav className="navbar navbar-expand-lg navbar--custom">
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
            <div className={navBar} id="navbarNavAltMarkup">
               <div className="navbar-nav">
                  <NavLink
                     className="nav-link nav-link--custom"
                     aria-current="page"
                     to={"/movies"}
                     onClick={() => onClickLink()}>
                     Movies
                  </NavLink>
                  <NavLink
                     className="nav-link nav-link--custom"
                     to="/movies"
                     onClick={() => onClickLink(onClickSearch)}>
                     Search
                  </NavLink>
                  {user && (
                     <NavLink
                        className="nav-link nav-link--custom"
                        to="/watchlist"
                        onClick={() => onClickLink()}>
                        Watch Later
                     </NavLink>
                  )}
                  {user && (
                     <NavLink
                        className="nav-link nav-link--custom"
                        to="/customers"
                        onClick={() => onClickLink()}>
                        Profile
                     </NavLink>
                  )}
                  {!user && (
                     <React.Fragment>
                        <NavLink
                           className="nav-link nav-link--custom"
                           to="/login"
                           onClick={() => onClickLink()}>
                           Login
                        </NavLink>
                        <NavLink
                           className="nav-link nav-link--custom"
                           to="/register"
                           onClick={() => onClickLink()}>
                           Register
                        </NavLink>
                     </React.Fragment>
                  )}
                  {user && (
                     <NavLink
                        className="nav-link nav-link--custom"
                        to="/logout"
                        onClick={() => onClickLink()}>
                        Logout
                     </NavLink>
                  )}
               </div>
            </div>
         </div>
      </nav>
   );
};

export default NavBar;
