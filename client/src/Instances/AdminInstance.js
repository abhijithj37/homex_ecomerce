import axios from 'axios'
// const baseURL = "http://localhost:8000/"

const baseURL = import.meta.env.VITE_SERVER_BASE_URL;


const defaultOption = {
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    }
}
let AdminInstance = axios.create(defaultOption);

AdminInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("AdminToken");
    // console.log("AdminInstance token:",token)

    config.headers.accesstoken = token;
    return config;
});


export default AdminInstance;







