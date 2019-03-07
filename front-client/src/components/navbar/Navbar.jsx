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

  componentDidMount() {
    this.fetchUser();
  }

  componentWillReceiveProps = nextProps => {
    this.setState({ ...this.state, loggedInUser: nextProps["user"] })
  }

  fetchUser = () => {
    this.service.loggedin()
      .then(user => {
        this.setState({ loggedInUser: user });
        this.props.changeUser(user)
      })
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
      <nav className="navbar navbar-expand-sm navbar-dark">
        <Link to="/" className="navbar-brand"><img src="/images/travelling-icon.png" alt="" /></Link>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          {(this.state.loggedInUser) ? (
            <ul className="navbar-nav">
              <li className="nav-item"><Link to='/profile' className="nav-link"><span>Profile</span></Link></li>
              <li className="nav-item">
                <Link to='/' className="nav-link"><button onClick={() => this.logoutUser()}><span>Logout</span></button></Link>
              </li>
            </ul>
          ) : (
              <ul className="navbar-nav">
                <li className="nav-item"><Link to='/login' className="nav-link"><span>Login</span></Link></li>
                <li className="nav-item"><Link to='/signup' className="nav-link"><span className="button">Sign Up</span></Link></li>
              </ul>
            )
          }
        </div>
      </nav>
    )
  }
}