import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";
import Home from './components/Home';
import Signup from './components/auth/Signup';
import Navbar from './components/Navbar';
import AuthService from './components/auth/Auth-service';
import Login from './components/auth/Login';


class App extends Component {

  constructor(props){
    super(props)
    this.state = { loggedInUser: null };
    this.service = new AuthService ();
  }

  fetchUser(){
    if( this.state.loggedInUser === null ){
      this.service.loggedin()
      .then(response =>{
        this.setState({
          loggedInUser:  response
        }) 
      })
      .catch( err =>{
        this.setState({
          loggedInUser:  false
        }) 
      })
    }
  }

  getTheUser= (userObj) => {
    this.setState({...this.state,
      loggedInUser: userObj
    })
  }

  render() {
    this.fetchUser()
    if(this.state.loggedInUser){
      return (
        <div className="App">
        <Navbar  getUser={this.getTheUser} userInSession={this.state.loggedInUser} />
          <Switch>
              <Route exact path="/" component={Home}/>
          </Switch>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} />
          <Switch>
            <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/>
            <Route exact path='/' render={() => <Login getUser={this.getTheUser}/>}/>
          </Switch>
        </div>
      );
    }
  }
}

export default App;
