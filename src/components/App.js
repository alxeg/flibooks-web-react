import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as flibooksActions from '../actions/flibooksActions';

import { Switch, Route } from 'react-router-dom';

import {deepOrange500, cyan50, cyan600} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Paper from 'material-ui/Paper';
import ClearFix from 'material-ui/internal/ClearFix';

import Header from './common/Header';
import OptionsPane from './common/OptionsPane';

import HomePage from './home/HomePage';
import AuthorsPage from './authors/AuthorsPage';
import AuthorBooksPage from './authors/AuthorBooksPage';
import BooksPage from './books/BooksPage';
import LibraryPage from './books/LibraryPage';
import SeriesPage from './books/SeriesPage';

import './RegisterTapEvent';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
  appBar: {
      color: cyan600,
      height: 50
  },
  tabs: {
  }
});

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            menuOpened: false,
        };

        this.onOptionsClick = this.onOptionsClick.bind(this);
        this.onOptionsShow = this.onOptionsShow.bind(this);
        this.onOptionsLangsChanged = this.onOptionsLangsChanged.bind(this);
        this.onOptionsNoDeletedChanged = this.onOptionsNoDeletedChanged.bind(this);
    }

    componentWillMount() {
        this.props.actions.getOptions();
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.menuOpenRequested && nextProps.optionsData.langs) {
            this.setState({
                menuOpened: true,
                menuOpenRequested: false
            });
        }
    }

    onOptionsClick() {
        this.setState({menuOpenRequested: true});
        this.props.actions.getLangs();
    }

    onOptionsShow(open) {
        this.setState({menuOpened: open});
    }

    onOptionsNoDeletedChanged(event, checked) {
        this.props.actions.saveNoDeleted(checked);

    }

    onOptionsLangsChanged(event, checked) {
        let langs = [... this.props.optionsData.selectedLangs];
        let lang = event.target.name;
        if (checked) {
            langs.push(lang);
        } else {
            langs = langs.filter((item) => item !== lang);
        }
        this.props.actions.saveSelectedLangs(langs);
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <Header
                        className="app-header"
                        loading={this.props.loading}
                        onOptionsClick = {this.onOptionsClick}
                    />
                    <OptionsPane
                        open={this.state.menuOpened}
                        options={this.props.optionsData}
                        onLangsChanged={this.onOptionsLangsChanged}
                        onNoDeletedChanged={this.onOptionsNoDeletedChanged}
                        onShow={this.onOptionsShow}
                    />

                    <Paper className="app-content" zDepth={2} rounded={false} >
                        <Switch>
                            <Route exact path="/authors" component={AuthorsPage} />
                            <Route exact path="/authors/:id" component={AuthorBooksPage} />
                            <Route exact path="/books" component={BooksPage} />
                            <Route exact path="/library" component={LibraryPage} />
                            <Route exact path="/series" component={SeriesPage} />
                            <Route exact path="/" component={HomePage} />
                        </Switch>
                    </Paper>
                </div>
            </MuiThemeProvider>
        );
    }
}
App.propTypes = {
    actions: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    optionsData: PropTypes.object.isRequired
};

App.defaultProps = {
    menuOpened: false
};

const mapStateToProps = (state, ownProps) => {
    let langs = {};
    let noDeleted = false;
    if (state.options) {
        noDeleted = state.options.noDeleted==true;
        if (Array.isArray(state.options.langs)) {
            let selected = state.options.selectedLangs;
            langs = state.options.langs.reduce((result, lang) => {
                result[lang] = (selected && selected.indexOf(lang) != -1)? true : false;
                return result;
            }, {});
        }
    }
    return {
        loading: state.ajaxCallsInProgress > 0,
        optionsData: {
            selectedLangs: state.options.selectedLangs,
            langs,
            noDeleted
        }
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(flibooksActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
