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
    this.getMovieshow("5c78475c9cbabf1f0da9c84b");
  }

  getMovieshow = movieshowId => {
    this.service.get(movieshowId).then(movieshow => {
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
            {this.state.movieshow.locations.map((eachLocation, idx) => {
                console.log(eachLocation.name)
                return (
                    <div key={eachLocation._id}>
                        <div className="card-group">
                            <div className="card">
                                <img src={eachLocation.images[0]} alt="pic place" className="card-img-top"/>
                                <div className="card-body">
                                <h6 className="card-title">{eachLocation.name}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
      );
    } else {
      return <div>No hay ninguna movieshow con este id</div>;
    }
  }
}
