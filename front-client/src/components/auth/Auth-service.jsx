import axios from 'axios';

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:5000/api/auth", //cambiar por la variable de entorno `${process.env.API_URL}/api/auth`
      withCredentials: true
    });
    this.service = service;
  }

  signup = (username, email, password) => {
    return this.service.post('/signup', {username, email, password})
    .then(response => response.data)
  }

  loggedin = () => {
    return this.service.get('/loggedin')
    .then(response => response.data)
  }

  login = (email, password) => {
    return this.service.post('/login', {email, password})
    .then(response => response.data)
  }

  logout = () => {
    return this.service.post('/logout')
    .then(response => response.data)
  }

  handleUpload (theFile) {
    return this.service.post('/upload', theFile)
      .then(res => res.data)
  }

  updatePhotoProfile = photo => {
    return this.loggedin().then(user => {
      user.imageUrl = photo.imageUrl;
      return this.service.post("/update", user)
      .then(res => res.data)
    })
  }
}

export default AuthService;
