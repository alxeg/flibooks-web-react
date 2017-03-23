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

export function getSelectedLangsSuccess() {
    return { type: types.GET_SELECTED_LANGS_DONE };
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
    return (dispatch) => {
        dispatch(beginAjaxCall());
        return FlibooksAPI.getAuthorBooks(id).then(books => {
            dispatch(getAuthorBooksSuccess(books));
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
export function getSelectedLangs() {
    return (dispatch) => {
        dispatch(getSelectedLangsSuccess());
    };
}

export function saveSelectedLangs(selectedLangs) {
    return (dispatch) => {
        dispatch(saveSelectedLangsSuccess(selectedLangs));
    };
}
