import axios from 'axios';

class CommentService {
  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:5000/api/comment", //cambiar por la variable de entorno `${process.env.API_URL}/api/auth`
      withCredentials: true
    });
    this.service = service;
  }

  sendComment = (locationId, content, title) => { 
      const comment= {locationId: locationId, content: content, title: title }
      return this.service.post('/', comment) 
      .then(response => response.data)
  }
}

export default CommentService;
