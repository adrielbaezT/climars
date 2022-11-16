import axios from 'axios';

export const apiAuth = axios.create({
  baseURL: 'http://192.168.15.202:85/api/',
});
