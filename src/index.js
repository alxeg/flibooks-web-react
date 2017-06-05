/*eslint-disable import/default */
import 'babel-polyfill';
import {render} from 'react-dom';
import './styles/styles.css'; //Webpack can import CSS files too!
import 'animate.css/animate.min.css';
import 'react-flexr/styles.css';
import React from 'react';
import AppProvider from './components/AppProvider';

render(
    <AppProvider />,
    document.getElementById('app')
);