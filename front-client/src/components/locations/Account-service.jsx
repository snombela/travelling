import axios from 'axios';

class AccountService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/api/account/me/favorite`, 
      withCredentials: true
    });
    this.service = service;
  }
  //favoritos de mi usuario
  getFavorites = () => {
      return this.service.get('/')
      .then(response => response.data)
  }

  deleteFavorite = (locationId) => {
      return this.service.delete(`/${locationId}`)
      .then(response => response.data)
  }

  addFavorite = (locationId) => {
    return this.service.post('/', {locationId: locationId})
    .then(response => response.data)
  }
}

export default AccountService;
