import React, { Component } from "react";
import AuthService from "../auth/Auth-service";
import AddPhoto from "./AddPhoto";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null,
      user: null
    };
    this.service = new AuthService();
  }

  componentDidMount() {
    this.service.loggedin().then(user => {
      console.log(user);
      this.setState({ ...this.state, user: user });
      this.props.changeUser(user);
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["user"] });
  }

  render() {
    console.log(this.props.loggedInUser);
    if (this.props.loggedInUser !== null && this.state.user !== null) {
      return (
        <div>
          <p>Welcome {this.state.user.username}!</p>
          <AddPhoto imageUrl={this.state.user.imageUrl} />
        </div>
      );
    } else {
      return <div>No estoy logueado</div>;
    }
  }
}
