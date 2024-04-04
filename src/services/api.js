import axios from 'axios';

//Base da url: //https://api.themoviedb.org/3/
//https://api.themoviedb.org/3/movie/now_playing?api_key=1be2715098fc79ad59feb33596d54284&language=PT-br

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;