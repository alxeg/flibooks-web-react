/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {persistStore, autoRehydrate} from 'redux-persist';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import createBrowserHistory from 'history/createBrowserHistory';
import './styles/styles.css'; //Webpack can import CSS files too!
import 'animate.css/animate.min.css';
import 'react-flexr/styles.css';
import App from './components/App';

const store = configureStore();
const history = createBrowserHistory();

persistStore(store, {
    whitelist: [ 'options' ]
});

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App} />
        </Router>
    </Provider>,
    document.getElementById('app')
);