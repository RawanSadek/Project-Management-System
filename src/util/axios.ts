
import axios from 'axios';


export const baseURL =`https://upskilling-egypt.com:3003/api/v1`

 
export const axiosInstance = axios.create({ baseURL,
   headers:{Authorization:localStorage.getItem("token")}
})
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization =  token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
 
// USERS_URLS

export const USERS_URLS ={
    LOGIN: `/Users/Login` ,
     REGISTER: `/Users/Register` ,
    FORGET_PASSWORD: `/Users/Reset/Request` ,
    RESET_PASSWORD: `/Users/Reset` ,
    VERIFYACCOUNT: `/Users/verify` ,
    CHANGEPASSWORD: `/Users/ChangePassword`
   
}
