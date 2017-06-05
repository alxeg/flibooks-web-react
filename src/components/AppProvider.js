
import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import { persistStore, autoRehydrate } from 'redux-persist';
import configureStore from '../store/configureStore';

import App from './App';

const store = configureStore();
const history = createBrowserHistory();

export default class AppProvider extends React.Component {

  constructor() {
    super();
    this.state = { rehydrated: false };
  }

  componentWillMount(){
      persistStore(store, {
        whitelist: [ 'options' ]
        }, () => {
            this.setState({ rehydrated: true });
        });
  }

  render() {
    if(!this.state.rehydrated){
      return <div>Loading...</div>;
    }
    return (
        <Provider store={store}>
            <Router history={history}>
                <Route path="/" component={App} />
            </Router>
        </Provider>
    );
  }
}