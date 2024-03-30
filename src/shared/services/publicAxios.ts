import axios from 'axios';

export const publicAxios = axios.create({
    baseURL: 'http://localhost:5003/api',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});
