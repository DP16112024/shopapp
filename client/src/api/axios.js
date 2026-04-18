import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://shopapp-api-atgddfang2fjf4gj.canadaeast-01.azurewebsites.net/api'
});

instance.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('userInfo') || 'null');
  if (user?.token) config.headers.Authorization = `Bearer ${user.token}`;
  return config;
});

export default instance;
