import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pet-manager-api.geia.vip',
});

export default api;
