import axios from 'axios';

class IdeasApi {
    constructor() {
        this._apiUrl = 'http://localhost:8080/api/ideas';
    };

    getIdeas() {
        // Alt to fetch - get request to the url
        return axios.get(this._apiUrl); // returns a promise
    }

    createIdea(data) {
        return axios.post(this._apiUrl, data);
    }
};

// Can export after initialization
export default new IdeasApi();