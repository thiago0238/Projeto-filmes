import axios from "axios";
// Base da url https://api.themoviedb.org/3/
// url da API movie/now_playing?api_key=f5984d8616be1614331f2870352d0d1e

const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/'
});

export default api;