import axios from 'axios'
// const baseURL="http://localhost:8000/"
const baseURL = import.meta.env.VITE_SERVER_BASE_URL;

const defaultOption={
    baseURL:baseURL,
    headers:{
        "Content-Type": "application/json",
    }
}
let UserInstance=axios.create(defaultOption);

UserInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("UserToken");
    // console.log("UserInstance token:",token)
    config.headers.accesstoken = token;
    return config;
  });


export default UserInstance;







