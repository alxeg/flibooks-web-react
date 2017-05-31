import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function optionsReducer(state = initialState.options, action) {
  switch (action.type) {

    case types.GET_LANGS_SUCCESS: {
        return Object.assign({}, state, { langs: action.langs });
    }

    case types.SAVE_SELECTED_LANGS_DONE: {
        return Object.assign({}, state, { selectedLangs: action.selectedLangs });
    }

    case types.SAVE_NO_DELETED_DONE: {
        return Object.assign({}, state, { noDeleted: action.noDeleted });
    }

    case types.GET_OPTIONS_DONE: {
        return Object.assign({}, state);
    }

    default:
      return state;
  }
}
