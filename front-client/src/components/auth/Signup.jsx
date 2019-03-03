import React, { Component } from 'react';
import AuthService from './Auth-service';
import './Login-Signup.scss'

import { Link, Redirect } from 'react-router-dom';

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = { 
      username: '',
      email: '', 
      password: '', 
      user: undefined
    };
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {username, email, password} = this.state;
    this.service.signup(username, email, password)
    .then( newUser => {
        this.setState({...this.state,
            username: "", 
            email: "",
            password: "",
            user: newUser
        });
        this.props.changeUser(newUser)
    })
    .catch( error => console.log(error) )
  }
  
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render(){
    return !this.state.user?(
        <div className="form">
        <form onSubmit={this.handleFormSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" name="username" className="form-control" value={this.state.username} onChange={ e => this.handleChange(e)}/>

          <label>Email:</label>
          <input type="email" name="email" className="form-control" value={this.state.email} onChange={e => this.handleChange(e)}></input>
          
          <label>Password:</label>
          <input type="password" name="password" className="form-control" value={this.state.password} onChange={ e => this.handleChange(e)} />
          
          <input type="submit" value="Signup" className="btn btn-primary"/>
          </div>
        <p>Already have account? 
            <Link to={"/login"}> Login</Link>
        </p>
        </form>
      </div>
    ): <Redirect to="/profile"/>
  }
}

export default Signup;



      
  
