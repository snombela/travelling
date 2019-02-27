import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from './auth/Auth-service';
import './Navbar.css'

class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({...this.state, loggedInUser: nextProps["userInSession"]})
  }

  logoutUser = () =>{
    this.service.logout()
    .then(() => {
      this.setState({ loggedInUser: null });
      console.log(this.props.getUser)
      this.props.getUser(null);  
    })
  }

    render(){
        if(this.state.loggedInUser){
        return(
            <nav className="nav">      
            <ul>
                <li>Welcome, {this.state.loggedInUser.username}</li>
                <li>
                <Link to='/'>
                    <button onClick={() => this.logoutUser()}>Logout</button>
                </Link>
                </li>
            </ul>
            </nav>
        )
        } else {
            return (
                <div>
                    <nav className="nav">
                    <ul>
                        <li><Link to='/login' style={{ textDecoration: 'none' }}>Login</Link></li>
                        <li><Link to='/signup' style={{ textDecoration: 'none' }}>Signup</Link></li>
                    </ul>
                    </nav>
                </div>
            )
        }
    }
}

export default Navbar;