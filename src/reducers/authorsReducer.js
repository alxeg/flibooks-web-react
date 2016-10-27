import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authorsReducer(state = initialState.authors, action) {
  switch (action.type) {
    case types.SEARCH_AUTHORS_SUCCESS:
      return Object.assign({}, state, action.authors);
    
    case types.GET_AUTHOR_SUCCESS: 
      return Object.assign({}, state, 
        {author: Object.assign({}, state.author, action.author)});

    case types.GET_AUTHOR_BOOKS_SUCCESS: 
      return Object.assign({}, state, 
        {author: Object.assign({}, state.author, {books: action.books})});

    default:
      return state;
  }
}
