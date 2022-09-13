import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";

import NavBar from "./components/navBar";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rental";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForms";
import LoginForm from "./components/loginForm";

function App() {
   return (
      <React.Fragment>
         <NavBar />
         <main className="container">
            <Switch>
               <Route path="/login" component={LoginForm} />
               <Route path="/movies/:_id" component={MovieForm} />
               <Route path="/movies" component={Movies} />
               <Route path="/customers" component={Customers} />
               <Route path="/rentals" component={Rentals} />
               <Route path="/not-found" component={NotFound} />
               <Redirect from="/" exact to="/movies" />
               <Redirect to="/not-found" />
            </Switch>
         </main>
      </React.Fragment>
   );
}

export default App;
