import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authorsReducer(state = initialState.bookInfo, action) {
  switch (action.type) {
    case types.GET_BOOK_SUCCESS:
      return Object.assign({}, state, {book: action.book});

    default:
      return state;
  }
}
