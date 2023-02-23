import axios from 'axios';

// We don't harcode secrets, we look them up either from ENV or use another method
// but here we hardcode it since this is a test task.
// We can even look up the base URL from ENV if we have separate dev, test and production
// APIs.
const apiClient = axios.create({
  baseURL: 'https://centra-flights-api.herokuapp.com/',
  headers: {
    'auth': 'PprxhenEbxzmL7YrOuRZ0EqSwpCzcqU2',
  },
});

export default apiClient;
