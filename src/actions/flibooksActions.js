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

export function searchAuthors(term) {
    return function(dispatch) {
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
    return function(dispatch) {
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
    return function(dispatch) {
        dispatch(beginAjaxCall());
        return FlibooksAPI.getAuthorBooks(id).then(books => {
            dispatch(getAuthorBooksSuccess(books));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw (error);
        });
    };
}