import React, { Component } from 'react'
import AuthService from '../auth/Auth-service';
import { Redirect } from 'react-router-dom';


export default class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {loggedInuser: null};
    this.service = new AuthService();
  }

  componentDidMount() {
    console.log("Dentro")
    this.setState({...this.state, loggedInUser: this.props.user});
  }

  componentWillReceiveProps(nextProps) {
    console.log("También dentro")
    this.setState({ ...this.state, loggedInUser: nextProps["user"] });
  }

  render() {
    return this.state.loggedInUser?(
      <div>
        Estoy en mi perfil
      </div>
    ):
    <div>No estoy logueado</div>
    
    // <Redirect to="/login"/>
  }
}
