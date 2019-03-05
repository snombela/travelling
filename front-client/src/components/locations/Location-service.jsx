import axios from 'axios';

class LocationService {
  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:5000/api/location", //cambiar por la variable de entorno `${process.env.API_URL}/api/auth`
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
