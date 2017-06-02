import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authorsReducer(state = initialState.books, action) {
  switch (action.type) {
    case types.SEARCH_BOOKS_SUCCESS:
    case types.SEARCH_BOOKS_BY_ID_SUCCESS:
    case types.SEARCH_BOOKS_SERIES_SUCCESS:
      return Object.assign({}, state, action.books);

    default:
      return state;
  }
}
