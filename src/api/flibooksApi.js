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
                        limit: 100
            }).then(processResponse);
    }

    static getAuthor(id) {
        return doHttpCall(`/api/author/${id}`, 'GET'
            ).then(processResponse);
    }

    static getAuthorBooks(id, deleted, langs) {
        return doHttpCall(`/api/author/${id}/books?no-details=true`, 'POST', {
                deleted,
                langs
            }).then(processResponse);
    }

    static searchForBooks(title, author, limit = 20, deleted, langs) {
        return doHttpCall(`/api/book/search`, 'POST', {
            title,
            author,
            limit,
            deleted,
            langs
        }).then(processResponse);
    }

    static searchForBooksSeries(title, series, limit, deleted, langs) {
        return doHttpCall(`/api/book/series`, 'POST', {
            title,
            series,
            limit,
            deleted,
            langs
        }).then(processResponse);
    }

    static getBook(id) {
        return doHttpCall(`/api/book/${id}`, 'GET'
            ).then(processResponse);
    }

    static getBooksById(libId) {
        return doHttpCall(`/api/book/lib/${libId}`, 'GET'
            ).then(processResponse);
    }

    static getLangs(id) {
        return doHttpCall(`/api/book/langs`, 'GET'
            ).then(processResponse);
    }
}

export default FlibooksAPI;