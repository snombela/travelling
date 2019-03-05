import React, { Component } from 'react'
import Movieshowservice from '../movieshow/Movieshow-service';
import LocationService from '../locations/Location-service';
import { Link } from 'react-router-dom';


export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: null,
      originalItems: null,
      search: ''
    }
    this.movieService = new Movieshowservice();
    this.locationService = new LocationService();
  }

  componentDidMount() {
   this.getAllMovies()
    .then(movieshowItems => {
      this.getAllLocation()
      .then(locationItems => {
        console.log(movieshowItems)
        const items = movieshowItems.concat(locationItems);
        this.setState({ ...this.state, items, originalItems: items})
      })
    })
  
  }
  getAllMovies = () => {
    return this.movieService.getMovieshowAll()
    .then(movieshow => {
      return movieshow.map((movie)=> {
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
      return location.map((location)=> {
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


  handleFormSearch = e => {
    const text = e.target.value;
    this.setState({ ...this.state, search: text })
    if (text.length > 0) {
      const items = this.state.originalItems.filter(item => {
        return item.name.toLowerCase().includes(text.toLowerCase()) || item.address.toLowerCase().includes(text.toLowerCase())
      })
      this.setState({ ...this.state, items: items })
    } else {
      this.setState({ ...this.state, items: this.state.originalItems })
    }
  };

  render() {
    if (this.state.items !== null) {
      return (
        <div>
          <input type="text" name="search" className="form-control" onChange={e => this.handleFormSearch(e)} placeholder="enter your query" />
          <Link to='/search'></Link>
          <div className="card-deck ">
            {this.state.items.map((item) => {
              return (
                <div key={item._id} className="card">
                  <Link to={item.url} style={{ textDecoration: 'none' }}>
                    <img src={item.backgroundUrl} alt="background" className="card-img-top img-card" />
                    <div className="card-body">
                      <h6 className="card-title">{item.name}</h6>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      )
    } else {
      return <h1>No hay nada que mostrar</h1>;
    }
  }
}
