import axios from 'axios';

class LocationService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/api/location`, 
      withCredentials: true
    });
    this.service = service;
  }

  getLocationAll = () => {
      return this.service.get('/')
      .then(response => response.data)
  }

  getLocationDetail = (locationId) => {
    return this.service.get(`/${locationId}`)
    .then(response => response.data)
  }

  getComments = (locationId) => {
    return this.service.get(`/${locationId}/comments`)
    .then(response => response.data)
  }

  

}

export default LocationService;
