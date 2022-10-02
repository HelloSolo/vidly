import React from "react";
import { NavLink, Link } from "react-router-dom";
import { getJwt } from "../services/authService";

const NavBar = ({ user }) => {
   return (
      <nav class="navbar navbar-expand-lg bg-light">
         <div class="container-fluid">
            <Link class="navbar-brand fw-bold fs-3" to="/movies">
               Vidly
            </Link>
            <button
               class="navbar-toggler"
               type="button"
               data-bs-toggle="collapse"
               data-bs-target="#navbarSupportedContent"
               aria-controls="navbarSupportedContent"
               aria-expanded="false"
               aria-label="Toggle navigation">
               <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
               <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                     <Link
                        class="nav-link active"
                        aria-current="page"
                        to="/movies">
                        Movies
                     </Link>
                  </li>
                  <li class="nav-item">
                     <NavLink class="nav-link" to="/customers">
                        Customers
                     </NavLink>
                  </li>
                  <li class="nav-item">
                     <NavLink class="nav-link" to="/rentals">
                        Customers
                     </NavLink>
                  </li>
                  {!getJwt() && (
                     <React.Fragment>
                        <li>
                           <NavLink className="nav-link" to="/login">
                              Login
                           </NavLink>
                        </li>
                        <li>
                           <NavLink className="nav-link" to="/register">
                              Register
                           </NavLink>
                        </li>
                     </React.Fragment>
                  )}

                  {getJwt && (
                     <li>
                        <NavLink className="nav-link" to="/register">
                           Register
                        </NavLink>
                     </li>
                  )}

                  <li class="nav-item dropdown">
                     <Link
                        class="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false">
                        Dropdown
                     </Link>
                     <ul class="dropdown-menu">
                        <li>
                           <Link class="dropdown-item" href="#">
                              Action
                           </Link>
                        </li>
                        <li>
                           <Link class="dropdown-item" href="#">
                              Another action
                           </Link>
                        </li>
                        <li>
                           <hr class="dropdown-divider" />
                        </li>
                        <li>
                           <Link class="dropdown-item" href="#">
                              Something else here
                           </Link>
                        </li>
                     </ul>
                  </li>
               </ul>

               <form class="d-flex" role="search">
                  <input
                     class="form-control me-2"
                     type="search"
                     placeholder="Search"
                     aria-label="Search"
                  />
               </form>
            </div>
         </div>
      </nav>
   );
};
