import {combineReducers} from 'redux';
import ajaxCallsInProgress from './ajaxStatusReducer';
import books from './booksReducer';
import bookInfo from './bookInfoReducer';
import authors from './authorsReducer';
import options from './optionsReducer';

const rootReducer = combineReducers({
    ajaxCallsInProgress,
    books,
    bookInfo,
    authors,
    options
});

export default rootReducer;