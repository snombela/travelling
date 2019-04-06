import React, { Component } from 'react';
import './App.scss';
import { Switch, Route } from "react-router-dom";
import Home from './components/Home';
import Signup from './components/auth/Signup';
import HeaderNavbar from './components/navbar/HeaderNavbar';
import Login from './components/auth/Login';
import Profile from './components/profile/Profile';
import Movieshow from './components/movieshow/Movieshow';
import Location from './components/locations/Location';
import Search from './components/search/Search';
import SearchLocation from './components/search/SearchLocation';

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
        <HeaderNavbar changeUser={this.changeUser} user={this.state.user}/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path='/signup' render={() => <Signup changeUser={this.changeUser}/>}/>
          <Route exact path='/login'  render={() => <Login changeUser={this.changeUser}/>}/>
          <Route exact path='/profile' render={() => <Profile changeUser={this.changeUser} loggedInUser={loggedInUser}/>}/>
          <Route exact path='/movieshow/:id' component={Movieshow}/>
          {/* <Route exact path='/location/:id' component={Location}/> */}
          <Route exact path='/location/:id' render={(routeProps) => (<Location {...routeProps} user={this.state.user} />)}/>
          <Route exact path='/search' component={Search}/>
          <Route exact path='/searchLocation' component={SearchLocation}/>
         
          
        </Switch>
      </div>

    )
  }
}

export default App;
