import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import LocationService from '../locations/Location-service';


export default class SearchLocation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: null,
      originalLocation: null,
      search: ''
    }
    this.service = new LocationService();
  }

  componentDidMount() {
    this.service.getLocationAll()
      .then(location => {
        this.setState({ ...this.state, location: location, originalLocation: location })
      })
  }

  handleFormSearch = e => { 
    const text = e.target.value;
    this.setState({ ...this.state, search: text })
    if (text.length > 0) {
    
      const location = this.state.originalLocation.filter(currentLocation => {
        const address = currentLocation.address;
        return address.toLowerCase().includes(text.toLowerCase()) || currentLocation.name.toLowerCase().includes(text.toLowerCase())
      })
      this.setState({ ...this.state, location: location })
    } else {
      this.setState({ ...this.state, location: this.state.originalLocation })
    }
  };

  render() {
    if (this.state.location !== null) {
      return (
        <div>
          <input type="text" name="search" className="form-control" onChange={e => this.handleFormSearch(e)} placeholder="enter your query" />
          <Link to='/search'></Link>
          <div className="card-deck ">
            {this.state.location.map((eachLocation) => {
              return (
                <div key={eachLocation._id} className="card">
                  <Link to={`/location/${eachLocation._id}`} style={{ textDecoration: 'none' }}>
                    <img src={eachLocation.images[0]} alt="pic place" className="card-img-top img-card" />
                    <div className="card-body">
                      <h5 className="card-title">{eachLocation.name}</h5>
                      <p>{eachLocation.address}</p>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      )
    } else {
      return <div></div>;
    }
  }
}
