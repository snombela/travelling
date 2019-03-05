import React, { Component } from "react";
import LocationService from "./Location-service";
import "./Location.scss";
import Comment from "../comment/Comment";
import AccountService from "./Account-service";

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
      }).length===1;
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

  render() {
    if (this.state.location !== null) {
      return (
        <div>
          <div className="bd-example">
            <div id="carouselExampleIndicators" className="carousel slide carousel-fade z-depth-1-half" data-ride="carousel">
              <ol className="carousel-indicators">
                {this.state.location.images.map((img, idx) => {
                  return <li data-target="#carouselExampleIndicators" data-slide-to={idx}></li>
                })}
              </ol>
              <div className="carousel-inner">
                {this.state.location.images.map(eachImage => {
                  return (
                      <div className="carousel-item active">
                        <img className="d-block w-100" src={eachImage} alt="images" />
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
          <button className="button-fav" onClick={this.clickFavButton}>{
            this.state.isFavorite ? 
            <img src="/images/red-heart.png" alt="heart"/> :
            <img src="/images/grey-heart.png" alt="heart"/> 
             }</button>
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

