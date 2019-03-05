import React, { Component } from 'react'
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_API_MAPS
});

export default class Mapbox extends Component {

  render() {
    var center = this.props.locations.reduce((res, l) => {
      res.latitude += l.latitude;
      res.longitude += l.longitude;
      return res;
     }, {})
     center.latitude = center.latitude / this.props.locations.length;
     center.longitude = center.longitude / this.props.locations.length;
    return (
      <Map
        style="mapbox://styles/mapbox/light-v9"
        center={[0.3976717, 44.928195]}
        zoom={[1]}
        containerStyle={{
          height: "50vh",
          width: "70vw",

        }}>
        <Layer
          type="symbol"
          id="marker"
          layout={{ "icon-image": "marker-15" }}>
          {this.props.locations.map(l => {
           return  <Feature coordinates={[l.longitude, l.latitude]} />  
          })}
        </Layer>
      </Map>
    )
  }
}
