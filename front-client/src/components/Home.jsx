import React, { Component } from "react";
import MovieshowService from "../components/movieshow/Movieshow-service";
import '../components/movieshow/Movieshow.scss'
import '../components/Home.scss'
import { Link } from 'react-router-dom';
import SearchBar from "./seachBar/SearchBar";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textToSearch: "",
      movieshow: null,
			originalMovieshow: null,
    };
    this.service = new MovieshowService();
  }

  componentDidMount() {
    this.service.getMovieshowAll().then(movieshow => {
      this.setState({ ...this.state, movieshow: movieshow, originalMovieshow: movieshow });
    });
  }

  getBackground = () => {
    console.log(this.state)
    if (this.state.textToSearch.length > 0) { return }
    const random = Math.floor(Math.random() * this.state.movieshow.length);
    return this.state.movieshow.map(eachMovieshow => {
      return eachMovieshow.backgroundUrl
    })[random]
  }

  changeTextSearch = (text) => {
		
		if (text.length > 0) {
			const movieshow = this.state.originalMovieshow.filter(movie => {
				return movie.title.toLowerCase().indexOf(text.toLowerCase())!==-1
			})
			this.setState({...this.state, movieshow: movieshow, textToSearch: text})
		} else {
			this.setState({...this.state, movieshow: this.state.originalMovieshow, textToSearch: text})
    }
  }

  render() {
    if (this.state.movieshow !== null) {
      return (
        <div>
          <div className="home-background" style={{backgroundImage: `url(${this.getBackground()})`}}>
          <SearchBar changeTextSearch={this.changeTextSearch}></SearchBar>
          </div>
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
