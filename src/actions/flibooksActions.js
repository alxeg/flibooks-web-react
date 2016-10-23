import * as types from './actionTypes';
import FlibooksAPI from '../api/flibooksApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function searchAuthorsSuccess(authors) {
    return { type: types.SEARCH_AUTHORS_SUCCESS, authors };
}

export function searchAuthors(name) {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        return FlibooksAPI.searchForAuthors(name).then(authors => {
            dispatch(searchAuthorsSuccess(authors));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw (error);
        });
    };
}