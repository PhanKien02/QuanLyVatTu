import axios from "axios"

const baseURLDev = "http://localhost:8081/api/"
const baseURLProduct = "https://serverquanlyvattu.onrender.com"
const instance = axios.create({
    baseURL: baseURLProduct  ,
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});

export default instance;
