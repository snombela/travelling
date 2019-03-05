import React, { Component } from "react";
import AuthService from "../auth/Auth-service";
import AddPhoto from "./AddPhoto";
import "./Profile.scss"
import AccountService from "../locations/Account-service";
import { Link } from 'react-router-dom';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      loggedInUser: null,
      user: null
    };
    this.service = new AuthService();
    this.serviceAccount = new AccountService();
  }

  componentDidMount() {
    this.service.loggedin().then(user => {
      console.log(user);
      this.setState({ ...this.state, user: user });
      this.props.changeUser(user);
    });
    this.serviceAccount.getFavorites().then(favorites => {
      this.setState({ ...this.state, locations: favorites });
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["user"] });
  }

  render() {
    console.log(this.props.loggedInUser);
    if (this.props.loggedInUser !== null && this.state.user !== null) {
      return (
        <div className="profile-container">
          <h2>Welcome {this.state.user.username}!</h2>
          <AddPhoto imageUrl={this.state.user.imageUrl} />
          <div className="card-deck ">
          {this.state.locations.map((eachLocation) => {
            return (
              <div key={eachLocation._id} className="card">
                <div class="thumbnail">
                  <Link to={`/location/${eachLocation._id}`} style={{ textDecoration: 'none' }}>
                    <img src={eachLocation.images[0]} alt="pic place" className="card-img-top img-card" />
                    <div className="card-body">
                      <h6 className="card-title">{eachLocation.name}</h6>
                    </div>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
        </div>
        );
    } else {
      return <div>No estoy logueado</div>;
        }
      }
    }
