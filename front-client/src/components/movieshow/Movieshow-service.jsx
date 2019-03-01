import axios from 'axios';

class Movieshowservice {
  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:5000/api/movieshow", //cambiar por la variable de entorno `${process.env.API_URL}/api/auth`
      withCredentials: true
    });
    this.service = service;
  }

  getMovieshowAll = () => {
      return this.service.get('/')
      .then(response => response.data)
  }

  getMovieshowDetail = (movieshowId) => {
    return this.service.get(`/${movieshowId}`)
    .then(response => response.data)
  }
}

export default Movieshowservice;
