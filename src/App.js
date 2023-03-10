import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import auth from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";
import NavBar from "./components/navBar";
import Movies from "./components/movies";
import Customers from "./components/customers";
import NotFound from "./components/notFound";
import MovieDetail from "./components/movieDetail";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import WatchList from "./components/watchlist";
import Subscription from "./components/subscription";
import VideoApp from "./components/videoApp";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./styles/movie.css";
import "./styles/login&register.css";
import "./styles/videoplayer.css";

import "video-react/dist/video-react.css";

class App extends Component {
   state = { displaySearchBar: false };

   componentDidMount() {
      const user = auth.getCurrentUser();
      const displaySearchBar = false;
      this.setState({ user, displaySearchBar });
   }

   handleTogglingSearch = (booleanValue, movieLink) => {
      if (booleanValue === false && movieLink === true) {
         this.setState({ displaySearchBar: booleanValue });
      } else {
         booleanValue = this.state.displaySearchBar ? false : true;
         this.setState({ displaySearchBar: booleanValue });
      }
   };

   render() {
      const { user, displaySearchBar } = this.state;
      return (
         <React.Fragment>
            <ToastContainer />
            <NavBar user={user} onClickSearch={this.handleTogglingSearch} />
            <main className="main">
               <Switch>
                  <Route path="/register" component={RegisterForm} />
                  <Route path="/login" component={LoginForm} />
                  <Route path="/logout" component={Logout} />
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
                  <ProtectedRoute path="/player/:_id" component={VideoApp} />
                  <ProtectedRoute
                     path="/subscriptions"
                     component={Subscription}
                  />
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
