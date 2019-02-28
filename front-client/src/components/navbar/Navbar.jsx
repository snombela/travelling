import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../auth/Auth-service';
import '../navbar/Navbar.css'

class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = { loggedInUser: null};
    this.service = new AuthService();
  }
  componentWillReceiveProps = nextProps => {
    this.setState({...this.state, loggedInUser:nextProps["user"]})
  }
  
  logoutUser = () =>{
    this.service.logout()
    .then(() => {
      this.setState({ loggedInUser: null });
      this.props.changeUser(null)
    })
  }
  render(){
    return(
      <nav className="nav">
        <ul>
          <li className={this.state.loggedInUser?'ocultar':'mostrar'}><Link to='/login' style={{ textDecoration: 'none' }}>Login</Link></li>
          <li className={this.state.loggedInUser?'ocultar':'mostrar'}><Link to='/signup' style={{ textDecoration: 'none' }}>Signup</Link></li>
          <li className={this.state.loggedInUser?'mostrar':'ocultar'} >
            <Link to='/'>
              <button onClick={() => this.logoutUser()}>Logout</button>
            </Link>
          </li>
        </ul>
      </nav>
    )
      
  }


}

export default Navbar;