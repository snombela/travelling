import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";
import Home from './components/Home';
import Signup from './components/auth/Signup';
import Navbar from './components/navbar/Navbar';
import Login from './components/auth/Login';
import Profile from './components/profile/Profile';
import Movieshow from './components/movieshow/Movieshow';
import Location from './components/locations/Location';

class App extends Component {

  constructor(props){
    super(props)
    this.state = { loggedInUser: null ,user:null};
  }
  
  changeUser = user => {
    this.setState({...this.state, user, loggedInUser:true})
  }

  render() {
    const { loggedInUser } = this.state
    return(
      <div className="App">
        <Navbar changeUser={this.changeUser} user={this.state.user}/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path='/signup' render={() => <Signup changeUser={this.changeUser}/>}/>
          <Route exact path='/login'  render={() => <Login changeUser={this.changeUser}/>}/>
          <Route exact path='/profile' render={() => <Profile changeUser={this.changeUser} loggedInUser={loggedInUser}/>}/>
          <Route exact path='/movieshow/:id' component={Movieshow}/>
          <Route exact path='/location/:id' component={Location}/>
        </Switch>
      </div>

    )
  }
}

export default App;
