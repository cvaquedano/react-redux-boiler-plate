import axiosClient from  './axios';

const tokenAuth = token => {
    if(token){
        axiosClient.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
        axiosClient.defaults.headers.Authorization = '';
    }
}

export default tokenAuth;