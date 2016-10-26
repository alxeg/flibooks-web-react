import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authorsReducer(state = initialState.authorsSearch, action) {
  switch (action.type) {
    case types.SEARCH_AUTHORS_SUCCESS:
      return action.authorsSearch;

    default:
      return state;
  }
}
