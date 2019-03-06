import axios from 'axios';

class Movieshowservice {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/api/movieshow`, 
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
