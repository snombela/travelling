import React, { Component } from 'react';
import AuthService from './Auth-service';
import { Link, Redirect} from 'react-router-dom';
import './Login-Signup.scss'

class Login extends Component {
  constructor(props){
    super(props);
    this.state = { 
      username: '',
      email: '', 
      password: '', 
      user: undefined};
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {email, password}= this.state;
    this.service.login(email, password)
    .then( userLogged => {
        this.setState({...this.state,
          email:"",
          password: "",
          user: userLogged
        });
        this.props.changeUser(userLogged)
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
          <label>Email:</label>
          <input type="email" name="email" className="form-control" placeholder="email" value={this.state.email} onChange={ e => this.handleChange(e)}/>

          <label>Password:</label>
          <input type="password" name="password" className="form-control" placeholder="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
          
          <input type="submit" value="Login" className="btn btn-primary" />
          </div>
        <p>Don't have account? 
            <Link to={"/signup"}> Signup</Link>
        </p>
        </form>
      </div>
    ): <Redirect to="/profile"/>
  }
}

export default Login;