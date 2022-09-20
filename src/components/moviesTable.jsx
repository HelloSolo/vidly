import React, { Component } from "react";
import { Link } from "react-router-dom";
import authService from "../services/authService";
import auth from "../services/authService";
import Like from "./common/like";
import Table from "./common/table";

class MoviesTable extends Component {
   deleteColumn = {
      key: "delete",
      content: (movie) => (
         <button
            className="btn btn-danger btn-sm"
            onClick={() => this.props.onDelete(movie)}
         >
            Delete
         </button>
      ),
   };

   constructor() {
      super();
      const user = auth.getCurrentUser();
      if (user && user.isAdmin) {
         this.columns.push(this.deleteColumn);
      }
   }
   columns = [
      {
         path: "title",
         label: "Title",
         content: (movie) => (
            <Link to={`/movies/${movie._id}`} className="nav nav-link">
               {movie.title}
            </Link>
         ),
      },
      { path: "genre.name", label: "Genre" },
      { path: "numberInStock", label: "Stock" },
      { path: "dailyRentalRate", label: "Rate" },
      {
         key: "like",
         content: (movie) => (
            <Like
               liked={movie.liked}
               onClick={() => this.props.onLike(movie)}
            />
         ),
      },
   ];

   render() {
      const { movies, onSort, sortColumn } = this.props;
      return (
         <Table
            data={movies}
            columns={this.columns}
            onSort={onSort}
            sortColumn={sortColumn}
         />
      );
   }
}

export default MoviesTable;
