import React, { Component } from "react";
import LocationService from "./Location-service";
import "./Location.scss";
import Comment from "../comment/Comment";

//url friendly
//filtrado en busqueda
//open graph info para compartir

export default class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      comments: []
    };
    this.service = new LocationService();
  }

  componentDidMount() {
    this.getLocation()
    this.getComments()
  }

  getLocation = () => {
    const locationId = this.props.match.params.id
    this.service.getLocationDetail(locationId).then(location => {
      this.setState({ ...this.state, location: location });
    });
  };

  getComments = () => {
    const locationId = this.props.match.params.id
    this.service.getComments(locationId).then(comments => {
      this.setState({ ...this.state, comments: comments });
    });
  };

  changeComment = (newComment) => {
    this.getComments()
  };

  render() {
    if (this.state.location !== null) {
      return (
        <div>
          <div className="bd-example">
            <div id="carousel-example-2" className="carousel slide carousel-fade z-depth-1-half" data-ride="carousel">
              <ol className="carousel-indicators">
                <li data-target="#carousel-example-2" data-slide-to="0" className="active"></li>
                <li data-target="#carousel-example-2" data-slide-to="1"></li>
                <li data-target="#carousel-example-2" data-slide-to="2"></li>
              </ol>
              <div className="carousel-inner">
                {this.state.location.images.map(eachImage => {
                  return (
                    <div key={eachImage}>
                      <div className="carousel-item active">
                        <img className="d-block w-100" src={eachImage} alt="images" />
                      </div>
                    </div>
                  );
                })}
              </div>
              <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
          <div className="colors">
          <div className="red">
          <h1>{this.state.location.name}</h1>
          <h6>{this.state.location.address}</h6>
          <p>{this.state.location.description}</p>
          </div>
          <div className="yellow">
          <p>MAPA</p>
          </div>
          </div>
       

          {this.state.comments.map(eachComment => {
            return (
              <div key={eachComment}>
                <div className="media">
                  <img
                    className="align-self-start mr-3"
                    src={eachComment.userId.imageUrl}
                    alt="user pic"
                  />
                  <div className="media-body">
                    <h6 className="mt-0">{eachComment.title}</h6>
                    <p>{eachComment.content}</p>
                  </div>
                </div>
              </div>
            );
          })}
          <Comment
            locationId={this.state.location._id}
            changeComment={this.changeComment}
          />
        </div>
      );
    } else {
      return <h1>No hay nada que mostrar</h1>;
    }
  }
}

