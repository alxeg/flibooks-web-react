import {combineReducers} from 'redux';
import ajaxCallsInProgress from './ajaxStatusReducer';
import authors from './authorsReducer';
import options from './optionsReducer';

const rootReducer = combineReducers({
    ajaxCallsInProgress,
    authors,
    options
});

export default rootReducer;