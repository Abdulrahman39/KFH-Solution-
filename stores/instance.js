import axios from "axios";

const instance = axios.create({
    baseURL: "https://7ec0-2a00-1851-8017-c8b1-60d6-46ee-7ac5-56b2.ngrok-free.app/",
    headers: {
        "mode": "cors",
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