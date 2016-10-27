// import fetch from 'isomorphic-fetch';
import thunk from 'redux-thunk';
// const API_URI = "http://localhost:8000";

const doHttpCall = (url, method, body) => {
    let params = {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    if (body) {
        params['body'] = JSON.stringify(body);
    }

    return fetch(url, params);
};

const processResponse = (response) => {
    switch(response.status) {
        case 200:
            return response.json();
        default:
            throw response.text();
    }
};

class FlibooksAPI {

    static searchForAuthors(name) {
        return doHttpCall("/api/author/search", 'POST', {
                        author: name,
                        limit: 20
            }).then(processResponse);
    }

    static getAuthor(id) {
        return doHttpCall(`/api/author/${id}`, 'GET'
            ).then(processResponse);
    }

    static getAuthorBooks(id) {
        return doHttpCall(`/api/author/${id}/books`, 'GET'
            ).then(processResponse);
    }
}

export default FlibooksAPI;