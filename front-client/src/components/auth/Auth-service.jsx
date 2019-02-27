import axios from 'axios';

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: 'http://localhost:5000/auth',
      withCredentials: true
    });
    this.service = service;
  }

  signup = (username, mail, password) => {
      return this.service.post('/signup', {username, mail, password})
      .then(response => response.data)
    }

    loggedin = () => {
      return this.service.get('/loggedin')
      .then(response => response.data)
    }

    login = ( mail, password) => {
      return this.service.post('/login', {mail, password})
      .then(response => response.data)
    }

    logout = () => {
      return this.service.post('/logout')
      .then(response => response.data)
    }
}


export default AuthService;
