import React, { Component } from "react";
import MovieshowService from "./Movieshow-service";
import './Movieshow.css';

export default class Movieshow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieshow: null
    };
    this.service = new MovieshowService();
  }

  componentDidMount() {
    this.getMovieshow(this.props.match.params.id);
  }

  getMovieshow = movieshowId => {
    this.service.getMovieshowDetail(movieshowId).then(movieshow => {
      this.setState({ ...this.state, movieshow: movieshow });
    });
  };

  render() {
    if (this.state.movieshow !== null) {
      return (
        <div>
            <img src={this.state.movieshow.backgroundUrl} alt="background" className="background"/>
            <img src={this.state.movieshow.posterUrl} alt="poster" className="poster"/>
           <h1>{this.state.movieshow.title}</h1>
           <div className="card-deck ">
            {this.state.movieshow.locations.map((eachLocation, idx) => {
                return (
                  <div key={eachLocation._id} className="card">
                    <img src={eachLocation.images[0]} alt="pic place" className="card-img-top img-card"/>
                    <div className="card-body">
                    <h6 className="card-title">{eachLocation.name}</h6>
                    </div>
                  </div>
                )
            })}
            </div>
        </div>
      );
    } else {
      return <div>No hay ninguna movieshow con este id</div>;
    }
  }
}
