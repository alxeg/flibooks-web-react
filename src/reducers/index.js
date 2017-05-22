import {combineReducers} from 'redux';
import ajaxCallsInProgress from './ajaxStatusReducer';
import books from './booksReducer';
import authors from './authorsReducer';
import options from './optionsReducer';

const rootReducer = combineReducers({
    ajaxCallsInProgress,
    books,
    authors,
    options
});

export default rootReducer;