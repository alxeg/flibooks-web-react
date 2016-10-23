// import fetch from 'isomorphic-fetch';
import thunk from 'redux-thunk';
// const API_URI = "http://localhost:8000";

class FlibooksAPI {

    static searchForAuthors(name) {
        return fetch("/api/author/search", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        author: name,
                        limit: 20
                    })
                })
            .then(response => {
                return response.json();
            });
    }
}

export default FlibooksAPI;