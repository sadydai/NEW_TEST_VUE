import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development' ? 'http://192.168.1.172:12222': '/';
axios.defaults.headers.post['Content-Type']= 'application/x-www-from-urlencoded';
axios.defaults.withCredentials = true;

function http(url:string, method :string, data:any) {
    return axios({
        url: `${baseURL}${url}`,
        method,
        data,
    });
}
export default http;

