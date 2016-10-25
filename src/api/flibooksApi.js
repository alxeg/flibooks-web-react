// import fetch from 'isomorphic-fetch';
import thunk from 'redux-thunk';
// const API_URI = "http://localhost:8000";

const doHttpCall = (url, method, body) => {
    return fetch(url, {
                method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
};

const processResponse = (response) => {
    switch(response.status) {
        case 200:
            return response.json();
        default:
            throw (Error(response.statusText));
    }
};

class FlibooksAPI {

    static searchForAuthors(name) {
        return doHttpCall("/api/author/search", 'POST', {
                        author: name,
                        limit: 20
            }).then(processResponse);
    }
}

export default FlibooksAPI;