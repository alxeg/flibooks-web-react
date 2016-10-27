import {combineReducers} from 'redux';
import ajaxCallsInProgress from './ajaxStatusReducer';
import authors from './authorsReducer';

const rootReducer = combineReducers({
    ajaxCallsInProgress,
    authors
});

export default rootReducer;