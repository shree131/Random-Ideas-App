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

    updateIdea(id, data) {
        return axios.put(`${this._apiUrl}/${id}`, data);
    }

    deleteIdea(id) {
        const username = localStorage.getItem('username')
            ? localStorage.getItem('username')
            : '';

        return axios.delete(`${this._apiUrl}/${id}`, {
            data: {
                username,
            },
        });
    }
};

// Can export after initialization
export default new IdeasApi();