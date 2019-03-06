import React, { Component } from "react";
import MovieshowService from "./Movieshow-service";
import './Movieshow.scss';
import { Link } from 'react-router-dom';
import Mapbox from "../maps/Mapbox";

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
          <div className="image-background" style={{ backgroundImage: `url(${this.state.movieshow.backgroundUrl})` }}>
          </div>
          <img src={this.state.movieshow.posterUrl} alt="poster" className="poster" />
          <span className="movieshow-title">{this.state.movieshow.title}</span>
          <div className="card-deck ">
            {this.state.movieshow.locations.map((eachLocation, idx) => {
              return (
                <div key={eachLocation._id} className="card">
                  <div class="thumbnail">
                    <Link to={`/location/${eachLocation._id}`} style={{ textDecoration: 'none' }}>
                      <img src={eachLocation.images[0]} alt="pic place" className="card-img-top img-card" />
                      <div className="card-body">
                        <h5 className="card-title">{eachLocation.name}</h5>
                      </div>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
          {(this.state.movieshow.locations.lenght > 0) ?
            <div className="map">
              <Mapbox locations={this.state.movieshow.locations} />
            </div>
            : <div></div>
          }

        </div>
      );
    } else {
      return <div>No hay ninguna movieshow con este id</div>;
    }
  }
}
