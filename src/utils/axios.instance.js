import axios from "axios";

const api = () => {

    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    const api = axios.create({
        baseURL: 'http://127.0.0.1:8080/',
        headers
    });


    return api;
};

export default api();