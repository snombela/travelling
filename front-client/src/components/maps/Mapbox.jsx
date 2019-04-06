import React, { Component } from 'react'
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_API_MAPS
});


export default class Mapbox extends Component {

  getCenter = (locations) => {
    var center = locations.reduce((res, l) => {
      res.latitude += parseFloat(l.latitude);
      res.longitude += parseFloat(l.longitude);
      return res;
    }, {
        latitude: 0,
        longitude: 0
      })
    center.latitude = center.latitude / locations.length;
    center.longitude = center.longitude / locations.length;
    return center
  }

  render() {
   const center = this.getCenter(this.props.locations)

    return (
      <Map
        style="mapbox://styles/mapbox/light-v9"
        center={[center.longitude, center.latitude]}
        zoom={[4]}
        containerStyle={{
          height: "50vh",
          width: "100%",

        }}>
        <Layer
          type="symbol"
          id="marker"
          layout={{ "icon-image": "marker-15" }}>
          {this.props.locations.map((l, index) => {
            return <Feature key={index} coordinates={[l.longitude, l.latitude]} />
          })}
        </Layer>
      </Map>
    )
  }
}
