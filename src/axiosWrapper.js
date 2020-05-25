import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.kuvera.in/api/v3'
});