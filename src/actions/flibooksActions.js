import * as types from './actionTypes';
import FlibooksAPI from '../api/flibooksApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function searchAuthorsSuccess(term, authors) {
    return { type: types.SEARCH_AUTHORS_SUCCESS, authors: {term, authors} };
}

export function getAuthorSuccess(author) {
    return { type: types.GET_AUTHOR_SUCCESS, author };
}

export function getAuthorBooksSuccess(books) {
    return { type: types.GET_AUTHOR_BOOKS_SUCCESS, books };
}

export function getLangsSuccess(langs) {
    return { type: types.GET_LANGS_SUCCESS, langs };
}

export function saveSelectedLangsSuccess(selectedLangs) {
    return { type: types.SAVE_SELECTED_LANGS_DONE, selectedLangs };
}

export function saveNoDeletedSuccess(noDeleted) {
    return { type: types.SAVE_NO_DELETED_DONE, noDeleted };
}

export function getOptionsSuccess() {
    return { type: types.GET_OPTIONS_DONE };
}

export function searchBooksSuccess(title, author, books) {
    return { type: types.SEARCH_BOOKS_SUCCESS, books: {title, author, books} };
}

export function getBooksSuccess(book) {
    return { type: types.GET_BOOK_SUCCESS, book};
}

export function searchBooksByIdSuccess(idBooks) {
    return { type: types.SEARCH_BOOKS_BY_ID_SUCCESS, books: {idBooks}};
}

export function searchAuthors(term) {
    return (dispatch) => {
        dispatch(beginAjaxCall());
        return FlibooksAPI.searchForAuthors(term).then(authors => {
            dispatch(searchAuthorsSuccess(term, authors));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw (error);
        });
    };
}

export function getAuthor(id) {
    return (dispatch) => {
        dispatch(beginAjaxCall());
        return FlibooksAPI.getAuthor(id).then(author => {
            dispatch(getAuthorSuccess(author));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw (error);
        });
    };
}

export function getAuthorBooks(id) {
    return (dispatch, getState) => {
        dispatch(getAuthorBooksSuccess([]));
        dispatch(beginAjaxCall());

        const langs = getState().options.selectedLangs;
        const deleted = !getState().options.noDeleted;
        return FlibooksAPI.getAuthorBooks(id, deleted, langs).then(books => {
            dispatch(getAuthorBooksSuccess(books));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw (error);
        });
    };
}

export function searchBooks(title, author) {
    return (dispatch, getState) => {
        dispatch(beginAjaxCall());

        const langs = getState().options.selectedLangs;
        const deleted = !getState().options.noDeleted;
        return FlibooksAPI.searchForBooks(title, author, 20, deleted, langs).then(books => {
            dispatch(searchBooksSuccess(title, author, books));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw (error);
        });
    };
}

export function searchBooksById(id) {
    return (dispatch) => {
        dispatch(beginAjaxCall());

        return FlibooksAPI.getBooksById(id).then(books => {
            dispatch(searchBooksByIdSuccess(books));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw (error);
        });
    };

}

export function getBook(id) {
    return (dispatch) => {
        dispatch(beginAjaxCall());

        return FlibooksAPI.getBook(id).then(book => {
            dispatch(getBooksSuccess(book));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw (error);
        });
    };
}

export function getLangs() {
    return (dispatch) => {
        dispatch(beginAjaxCall());
        return FlibooksAPI.getLangs().then(langs => {
            dispatch(getLangsSuccess(langs));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw (error);
        });
    };
}
export function getOptions() {
    return dispatch => {
        dispatch(getOptionsSuccess());
    };
}

export function saveSelectedLangs(selectedLangs) {
    return (dispatch) => {
        dispatch(saveSelectedLangsSuccess(selectedLangs));
    };
}

export function saveNoDeleted(noDeleted) {
    return (dispatch) => {
        dispatch(saveNoDeletedSuccess(noDeleted));
    };
}

