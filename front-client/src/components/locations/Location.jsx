import React, { Component } from "react";
import LocationService from "./Location-service";
import "./Location.scss";
import Comment from "../comment/Comment";
import AccountService from "./Account-service";
import Mapbox from "../maps/Mapbox";
import ReactBootstrapCarousel from "react-bootstrap-carousel";
import CommentService from "../comment/Comment-service";


//url friendly
//filtrado en busqueda
//open graph info para compartir

export default class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: false,
      location: null,
      comments: []
    };
    this.serviceLocation = new LocationService();
    this.serviceAccount = new AccountService();
    this.serviceComment = new CommentService();
  }

  componentDidMount() {
    this.getLocation();
    this.getComments()
    this.getFavorites();
  }

  getLocation = () => {
    const locationId = this.props.match.params.id;
    return this.serviceLocation.getLocationDetail(locationId).then(location => {
      this.setState({ ...this.state, location: location });
    });
  };

  getComments = () => {
    const locationId = this.props.match.params.id;
    this.serviceLocation.getComments(locationId).then(comments => {
      this.setState({ ...this.state, comments: comments });
    });
  };

  getFavorites = () => {
    const locationId = this.props.match.params.id;
    this.serviceAccount.getFavorites()
      .then(favorites => {
        const isFavorite = favorites.filter(favorite => {
          return favorite._id === locationId;
        }).length === 1;
        this.setState({ ...this.state, isFavorite: isFavorite });
      })
  }

  changeComment = (newComment) => {
    this.getComments()
  };

  clickFavButton = () => {
    const locationId = this.props.match.params.id;
    if (this.state.isFavorite) {
      this.serviceAccount.deleteFavorite(locationId)
    } else {
      this.serviceAccount.addFavorite(locationId)
    }
    this.setState({ ...this.state, isFavorite: !this.state.isFavorite });
  }

  clickDeleteButton = (commentId) => {
    this.serviceComment.deleteComment(commentId)
    .then(() => {
      this.changeComment();
    });  
  }

  getDateFormatted = (created_at) => {
      return created_at.split("T")[0].split("-").reverse().join("/");
  }

  isUserLogged = () => this.props.user !== null;

  render() {
    if (this.state.location !== null) {
      return (
        <div>
          <div className="carrusel-container">
            <ReactBootstrapCarousel
              version={4}>
              {this.state.location.images.map((eachImage, index) => {
                return <img key={index} className="image-carrusel" src={eachImage} alt="images" />
              })}
            </ReactBootstrapCarousel>
          </div>
          <div className="info-container">
            <div className="left-container">
              <div className="title-container">
              <h1>{this.state.location.name}</h1>
              {this.isUserLogged() ? 
              <button className="button-fav" onClick={() => this.clickFavButton()}>
              {this.state.isFavorite ?
                  <img src="/images/red-heart.png" alt="heart" /> :
                  <img src="/images/grey-heart.png" alt="heart" />
              }</button>
              : <div></div>} 
              </div>
              <h4>{this.state.location.address}</h4>
              <p>{this.state.location.description}</p>
            </div>
            <div className="right-container">
              <Mapbox locations={[this.state.location]} />
            </div>
          </div>
          {this.state.comments.map(eachComment => {
            return (
              <div key={eachComment._id}>
                <div className="media">
                  <img
                    className="align-self-start mr-3"
                    src={eachComment.userId.imageUrl}
                    alt="user pic"
                  />
                  <div className="media-body">
                    <h5>{eachComment.userId.username + " - " + this.getDateFormatted(eachComment.created_at)}</h5>
                    <h6 className="mt-0">{eachComment.title}</h6>
                    <p>{eachComment.content}</p>
                    <button className="button-delete" onClick={ () => this.clickDeleteButton(eachComment._id)}>Delete</button>
                    {/* Capturar el click para que elimine el comentario llamando al service*/}
                  </div> 
                </div>
              </div>
            );
          })}
          {this.isUserLogged() ? 
          <Comment
            locationId={this.state.location._id}
            changeComment={this.changeComment}
          /> : <div></div>
          }
          </div>
      );
    } else {
      return <div></div>;
    }
  }
}

