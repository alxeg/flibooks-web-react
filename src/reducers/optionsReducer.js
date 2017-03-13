import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function optionsReducer(state = initialState.options, action) {
  switch (action.type) {

    case types.GET_LANGS_SUCCESS: {
        let langs = action.langs.reduce((result, lang) => {
            result[lang] = (state.selectedLangs.indexOf(lang) != -1);
            return result;
        }, {});
        return Object.assign({}, state, { langs });
    }

    default:
      return state;
  }
}
