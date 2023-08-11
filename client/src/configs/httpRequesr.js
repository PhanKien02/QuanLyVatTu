import axios from "axios"

const baseURLDev = "http://localhost:8081/api/"
const baseURLProduct = "https://serverquanlyvattu.onrender.com/api/"
const instance = axios.create({
    baseURL: baseURLProduct  ,
    timeout: 1000000,
    headers: { "X-Custom-Header": "foobar" },
    withCredentials: true,
});
instance.interceptors.request.use((request) => {
    const session = sessionStorage.getItem("token");
    const token = session ?  JSON.parse(session) : null;
    if (token) {
        request.headers.Authorization = `Bearer ${token.token}`;
        return request;
    } else {
        return request;
    }
});

instance.interceptors.response.use((response) => {
    return response
},(error =>{
    console.log("error",error);
    if (error.response.status ==401) {  instance.post("refreshToken")
        .then(response =>{
            console.log(response)
            sessionStorage.setItem("token",JSON.stringify({token : response.data.data}))
        }
        )
        .catch(err=>err);
            return error ;
    }
    return error
})
);
export default instance;
