import React, { Component } from "react";
import { Player } from "video-react";
import { getMovie } from "../services/movieService";

class VideoApp extends Component {
   state = { source: "" };

   async populateSource() {
      try {
         const movie_id = this.props.match.params._id;
         const { data: movie } = await getMovie(movie_id);
         const source = movie.links[0].link;
         this.setState({ source });
      } catch (error) {
         if (error.response && error.response.status === 404)
            this.props.history.replace("/not-found");
      }
   }

   async componentDidMount() {
      await this.populateSource();
   }

   render() {
      return (
         <div className="video-container">
            <div className="video-wrapper">
               <Player autoPlay={true}>
                  <source src={"http://media.w3.org/2010/05/bunny/movie.mp4"} />
               </Player>
            </div>
         </div>
      );
   }
}

export default VideoApp;
