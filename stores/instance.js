import axios from "axios";
export const  url = 'localhost';

const instance = axios.create({
    baseURL: `http://${url}:8080/`,
    headers: {
        "mode": "no-cors",
    },


});

instance.interceptors.response.use((response) => {
    return response.data;
});
instance.interceptors.request.use((request) => {
    if (window.localStorage.getItem('token')) {
        request.headers.Authorization = `Bearer ${window.localStorage.getItem('token')}`;

    }
    return request;
});

export default instance;