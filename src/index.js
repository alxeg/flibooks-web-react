/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {persistStore, autoRehydrate} from 'redux-persist';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import './styles/styles.css'; //Webpack can import CSS files too!
import 'animate.css/animate.min.css';
import 'react-flexr/styles.css';

const store = configureStore();

persistStore(store, {
    whitelist: [ 'options' ]
});

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
    </Provider>,
    document.getElementById('app')
);