import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/home/HomePage';
import AuthorsPage from './components/authors/AuthorsPage';
import BooksPage from './components/books/BooksPage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="/authors" component={AuthorsPage} />
        <Route path="/books" component={BooksPage} />
    </Route>
);