import React, { Component } from "react";
import LocationService from "./Location-service";
import "./Location.scss";
import Comment from "../comment/Comment";

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
          <h1>{this.state.location.name}</h1>
          <h6>{this.state.location.address}</h6>
          <p>{this.state.location.description}</p>
          {this.state.location.images.map(eachImage => {
            return (
              <div key={eachImage}>
                <div className="pic">
                  <img src={eachImage} alt="images" />
                </div>
              </div>
            );
          })}

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
