import axios from 'axios';

class CommentService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/api/comment`, 
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
