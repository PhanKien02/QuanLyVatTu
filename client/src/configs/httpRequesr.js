import axios from "axios"

const baseURLDev = "http://localhost:8081/api/"
const baseURLProduct = "http://localhost:8081/api/"
const instance = axios.create({
    baseURL: baseURLDev  ,
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});

export default instance;