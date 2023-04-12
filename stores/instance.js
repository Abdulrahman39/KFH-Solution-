import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/",
    headers: {
        "Content-Type": "application/json",
    }
});

instance.interceptors.response.use((response) => {
    return response.data;
});

export default instance;