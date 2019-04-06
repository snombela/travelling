
import React, { Component } from 'react';
import AuthService from '../auth/Auth-service';
import '../navbar/HeaderNavbar.scss'
import {
  Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink
} from 'reactstrap';

export default class HeaderNavbar extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { loggedInUser: null, isOpen: false };
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

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <Navbar dark={true} className="nav" expand="sm">
        <NavbarBrand href="/"><img src="/images/travelling-icon.png" alt="" /></NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse className="justify-content-end" isOpen={this.state.isOpen} navbar>
          {(this.state.loggedInUser) ? (
            <Nav navbar>
              <NavItem>
                <NavLink href="/profile"><span>Profile</span></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/"><button onClick={() => this.logoutUser()}><span>Logout</span></button></NavLink>
              </NavItem>
            </Nav>
          ) : (
              <Nav navbar>
                <NavItem>
                  <NavLink href="/login"><span>Login</span></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/signup"><span className="button">SignUp</span></NavLink>
                </NavItem>
              </Nav>
            )
          }
        </Collapse>
      </Navbar >
    )
  }
}