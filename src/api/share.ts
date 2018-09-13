import axios from 'axios';

const service = axios.create({
    baseURL: process.env.NODE_ENV === 'development'? 'http://localhost:9090' :'/',
});
axios.defaults.headers.post['Content-Type']= 'application/x-www-from-urlencoded';
axios.defaults.withCredentials=true;

export default service;
