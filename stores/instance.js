import axios from "axios";

const instance = axios.create({
    baseURL: "https://d9f4-2a00-1851-8017-c8b1-4c0c-8e40-4ba-5468.ngrok-free.app/",
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