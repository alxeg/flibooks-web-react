import * as types from './actionTypes';
import FlibooksAPI from '../api/flibooksApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function searchAuthorsSuccess(term, authors) {
    return { type: types.SEARCH_AUTHORS_SUCCESS, authorsSearch: {term, authors} };
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