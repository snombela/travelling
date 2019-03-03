import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../auth/Auth-service';
import '../navbar/Navbar.scss'

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }
  componentWillReceiveProps = nextProps => {
    this.setState({ ...this.state, loggedInUser: nextProps["user"] })
  }

  logoutUser = () => {
    this.service.logout()
      .then(() => {
        this.setState({ loggedInUser: null });
        this.props.changeUser(null)
      })
  }

  render() {
    return (
      <nav className="menu-fixed navbar navbar-expand-lg navbar-light">
        <Link to="/" className="navbar-brand"><img src="/images/travelling-icon.png" alt="" /></Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="nav collapse navbar-collapse justify-content-end" id="navbarNav"></div>
        {(this.state.loggedInUser) ? (
          <ul className="nav navbar-nav">
            <li className="nav-item"><Link to='/profile' style={{ textDecoration: 'none' }}>Profile</Link></li>
            <li className="nav-item">
              <Link to='/'><button onClick={() => this.logoutUser()}>Logout</button></Link>
            </li>
          </ul>
        ) : (
            <ul className="nav navbar-nav">
              <li className="nav-item"><Link to='/login' style={{ textDecoration: 'none' }}><span class="nav-item">Login</span></Link></li>
              <li className="nav-item"><Link to='/signup' style={{ textDecoration: 'none' }}><span class="button-nav">Sign Up</span></Link></li>
            </ul>
          )
        }
      </nav>
    )
  }
}