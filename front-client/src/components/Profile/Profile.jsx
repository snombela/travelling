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
      this.props.changeUser(user)
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log("También dentro")
    this.setState({ ...this.state, loggedInUser: nextProps["user"] });
  }

  render() {
    if (this.props.loggedInUser!==null){
    return (
      <div>
        Estoy en mi perfil
      </div>
    ) } else {
      return (
        <div>No estoy logueado</div>
      )
    }
    
    // <Redirect to="/login"/>
  }
}
