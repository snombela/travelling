import React, { Component } from "react";
import MovieshowService from "../components/movieshow/Movieshow-service";
import LocationService from '../components/locations/Location-service';
import '../components/movieshow/Movieshow.scss'
import '../components/Home.scss'
import { Link } from 'react-router-dom';
import SearchBar from "./seachBar/SearchBar";

const ITEMS_TO_SHOW = 12

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textToSearch: '',
      items: [],
      originalItems: [],
    };
    this.movieService = new MovieshowService();
    this.locationService = new LocationService();
  }

  componentDidMount() {
    Promise.all([this.getAllMovies(), this.getAllLocation()])
      .then(values => {
        const items = [...values[0], ...values[1]]
        this.setState({ ...this.state, items, originalItems: items })
      })
  }

  getAllMovies = () => {
    return this.movieService.getMovieshowAll()
      .then(movieshow => {
        return movieshow.map((movie) => {
          return {
            _id: movie._id,
            name: movie.title,
            address: '',
            backgroundUrl: movie.backgroundUrl,
            url: `/movieshow/${movie._id}`
          }
        })
      })
  }

  getAllLocation = () => {
    return this.locationService.getLocationAll()
      .then(location => {
        return location.map((location) => {
          return {
            _id: location._id,
            name: location.name,
            address: location.address,
            backgroundUrl: location.images[0],
            url: `/location/${location._id}`
          }
        })
      })
  }

  getBackground = () => {
    if (this.state.textToSearch.length > 0) { return }
    const random = Math.floor(Math.random() * ITEMS_TO_SHOW);
    return this.state.items.map(eachMovieshow => {
      return eachMovieshow.backgroundUrl
    })[random]
  }

  changeTextSearch = (text) => {
    if (text.length > 0) {
      const items = this.state.originalItems.filter(item => {
        return item.name.toLowerCase().includes(text.toLowerCase()) || item.address.toLowerCase().includes(text.toLowerCase())
      })
      this.setState({ ...this.state, items: items, textToSearch: text })
    } else {
      this.setState({ ...this.state, items: this.state.originalItems, textToSearch: text })
    }
  }

  getItemsToShow = () => {
    if (this.state.textToSearch.length > 0) {
      return this.state.items
    } else {
      return this.state.items.filter((movie, idx) => idx < ITEMS_TO_SHOW)
    }
  }

  render() {
    if (this.state.items !== null) {
      return (
        <div>
          <div className="home-background" style={{ backgroundImage: `url(${this.getBackground()})` }}>
            <SearchBar changeTextSearch={this.changeTextSearch}></SearchBar>
          </div>
          <div className="card-deck ">
            {this.getItemsToShow().map(item => {
              return (
                <div key={item._id} className="card">
                  <div className="thumbnail">
                    <Link to={item.url} style={{ textDecoration: 'none' }}>
                      <img src={item.backgroundUrl} alt="background" className="card-img-top img-card" />
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })
            }
          </div>
        </div>
      );
    } else {
      return <h1>En estos momentos no hay información disponible</h1>;
    }
  }
}
