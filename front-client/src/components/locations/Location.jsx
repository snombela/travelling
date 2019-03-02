import React, { Component } from "react";
import LocationService from "./Location-service";

export default class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null
    };
    this.service = new LocationService();
  }
  componentDidMount() {
    this.getLocation(this.props.match.params.id);
  }

  getLocation = locationId => {
    this.service.getLocationDetail(locationId).then(location => {
      this.setState({ ...this.state, location: location });
    });
  };

  render() {
    if (this.state.location !== null) {
      return (
        <div>
          <h1>{this.state.location.name}</h1>
          <p>{this.state.location.description}</p>
          {this.state.location.images.map((eachImage) => {
            return (
              <div key={eachImage}>
                <img src={eachImage} alt="images" />
              </div>
            );
          })}
        </div>
      );
    } else {
      return <h1>No hay nada que mostrar</h1>;
    }
  }
}
