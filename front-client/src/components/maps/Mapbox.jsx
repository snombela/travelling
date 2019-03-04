import React, { Component } from 'react'
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';


const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1Ijoic25vbWJlbGEiLCJhIjoiY2pzdXNocG1xMWJ1bDQ0czk4eGZqdTh3YyJ9.CcMLs-gqGuZDSGtU_DEhCQ"
});

export default class Mapbox extends Component {

  render() {
    console.log(this.props.locations)
    var center = this.props.locations.reduce((res, l) => {
      console.log(l)
      res.latitude += l.latitude;
      res.longitude += l.longitude;
      return res;
     }, {})
     center.latitude = center.latitude / this.props.locations.length;
     center.longitude = center.longitude / this.props.locations.length;

     console.log(center)

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
