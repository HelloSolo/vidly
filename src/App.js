import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import auth from "./services/authService";
import NavBar from "./components/navBar";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rental";
import NotFound from "./components/notFound";
import MovieDetail from "./components/movieDetail";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import WatchList from "./components/watchlist";
import ProtectedRoute from "./components/common/protectedRoute";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./styles/movie.css";
import "./styles/login&register.css";

class App extends Component {
   state = { displaySearchBar: false };

   componentDidMount() {
      const user = auth.getCurrentUser();
      const displaySearchBar = false;
      this.setState({ user, displaySearchBar });
   }

   handleTogglingSearch = () => {
      this.setState({ displaySearchBar: true });
   };

   handleTogglingHome = () => {
      this.setState({ displaySearchBar: false });
   };

   render() {
      const { user, displaySearchBar } = this.state;
      return (
         <React.Fragment>
            <ToastContainer />
            <NavBar
               user={user}
               displaySearchBar={displaySearchBar}
               onClickSearch={this.handleTogglingSearch}
               onClickSlide={this.handleTogglingHome}
            />
            <main className="main">
               <Switch>
                  <Route path="/register" component={RegisterForm} />
                  <Route path="/login" component={LoginForm} />
                  <Route path="/logout" component={Logout} />
                  {/* <ProtectedRoute path="/movies/:_id" component={MovieDetail} /> */}
                  <Route path="/movies/:_id" component={MovieDetail} />
                  <Route
                     path="/movies"
                     render={(props) => (
                        <Movies
                           {...props}
                           user={user}
                           displaySearchBar={displaySearchBar}
                        />
                     )}
                  />
                  <Route path="/customers" component={Customers} />
                  <ProtectedRoute path="/watchlist" component={WatchList} />
                  <Route path="/rentals" component={Rentals} />
                  <Route path="/not-found" component={NotFound} />
                  <Redirect from="/" exact to="/movies" />
                  <Redirect to="/not-found" />
               </Switch>
            </main>
         </React.Fragment>
      );
   }
}

export default App;
