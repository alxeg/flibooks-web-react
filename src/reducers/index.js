import {combineReducers} from 'redux';
import ajaxCallsInProgress from './ajaxStatusReducer';
import authorsSearch from './authorsReducer';

const rootReducer = combineReducers({
    ajaxCallsInProgress,
    authorsSearch
});

export default rootReducer;