import React, { Component } from "react";
import { getMovies, deleteMovie as baseDeleteMovie } from "../services/fakeMovieService";

class Movies extends Component {
    state = { 
        movies: getMovies(),
     }

    render() { 
        return (
            <React.Fragment>
                {this.details()}
                {this.state.movies.length != 0 && this.constructTable(this.state.movies)}
            </React.Fragment>
        );
    }

    details(){
        const movies = this.state.movies
        if (movies.length === 0) return <p>There are no movies in the database</p>

        return <p>Showing {movies.length} movies in the database </p>
    }

    handleDelete = (id)=> {
        baseDeleteMovie(id)
        this.setState({movies: getMovies() })
    }

    constructTable(movies){
        const tableHeader = ['Title', 'Genre', 'Stock', 'Rate', '']
        return (
            <table className="table">
                <thead><tr>{tableHeader.map(header => <th key={header}>{header}</th>)}</tr></thead>
                <tbody>
                    {movies.map(movie => {
                        let {_id, title, genre, numberInStock, dailyRentalRate} = movie
                        let description = [title, genre.name, numberInStock, dailyRentalRate]
                        return (
                            <tr key={_id}>
                                {description.map(item => <td key={item}>{item}</td>)}
                                <td><button onClick={() => this.handleDelete(_id)} className="btn btn-danger btn-sm">Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }
}
 
export default Movies;