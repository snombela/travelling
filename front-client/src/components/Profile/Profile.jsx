import React, { Component } from 'react'
import AuthService from '../auth/Auth-service';
// import { Redirect } from 'react-router-dom';


export default class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {loggedInUser: null};
    this.service = new AuthService();
  }

  componentDidMount() {
    this.service.loggedin().then(user => {
      console.log(user)
      this.props.changeUser(user)
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["user"] });
  }

  render() {
    console.log(this.props.loggedInUser)
    if (this.props.loggedInUser!==null){
    return (
      <div>
        <p>Estoy en mi perfil{this.props.loggedInUser}</p>
      </div>
    ) } else {
      return (
        <div>No estoy logueado</div>
      )
    }
    // <Redirect to="/login"/>
  }
}
