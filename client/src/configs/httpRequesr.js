import axios from "axios"

// const baseURLDev = "http://localhost:8081/api/"
const baseURLProduct = "https://serverquanlyvattu.onrender.com/api/"
const instance = axios.create({
    baseURL: baseURLProduct  ,
    timeout: 1000000,
    headers: {'X-Custom-Header': 'foobar'}
});

export default instance;
