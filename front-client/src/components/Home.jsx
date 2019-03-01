import React, { Component } from "react";
import MovieshowService from "../components/movieshow/Movieshow-service";
import '../components/movieshow/Movieshow.css'
import '../components/Home.css'
import { Link } from 'react-router-dom';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieshow: null
    };
    this.service = new MovieshowService();
  }
  componentDidMount() {
    this.service.getMovieshowAll().then(movieshow => {
      this.setState({ ...this.state, movieshow: movieshow });
    });
  }

  getBackground = () => {
    const random = Math.floor(Math.random() * this.state.movieshow.length);
    console.log(random)
    return this.state.movieshow.map(eachMovieshow => {
      return eachMovieshow.backgroundUrl
    })[random]
  }


  render() {
    if (this.state.movieshow !== null) {
      return (
        <div>
          <div className="home-background" style={{backgroundImage: `url(${this.getBackground()})`}} />
          <div className="card-deck ">
          {this.state.movieshow.slice(0, 12).map(eachMovieshow => {
            return (
              <div key={eachMovieshow._id} className="card">
              <Link to={`/movieshow/${eachMovieshow._id}`} style={{textDecoration: 'none'}}>
                <img src={eachMovieshow.backgroundUrl} alt="background" className="card-img-top img-card"/>
                <div className="card-body">
                <h6 className="card-title">{eachMovieshow.title}</h6>
                </div>
              </Link>
            </div>
            );
          })}
          </div>
        </div>
      );
    } else {
      return <h1>No hay nada que mostrar</h1>;
    }
  }
}
