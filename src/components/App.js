import React, {PropTypes} from 'react';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as flibooksActions from '../actions/flibooksActions';

import { browserHistory } from 'react-router';

import {deepOrange500, cyan50, cyan600} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Paper from 'material-ui/Paper';
import ClearFix from 'material-ui/internal/ClearFix';

import Header from './common/Header';
import OptionsPane from './common/OptionsPane';

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
        this.onOptionsSave = this.onOptionsSave.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.menuOpenRequested && nextProps.options.langs) {
            this.setState({
                menuOpened: true,
                menuOpenRequested: false
            });
        }
        if (nextProps.options.selectedLangs) {
            this.setState({
                selectedLangs: new Set(nextProps.options.selectedLangs)
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

    onOptionsSave() {
        let langs = [... this.state.selectedLangs];
        this.props.actions.saveLangs(langs);
        this.setState({ menuOpened: false });
    }

    onOptionsLangsChanged(event, checked) {
        let langs = this.state.selectedLangs;
        let lang = event.target.name;
        if (checked) {
            langs.add(lang);
        } else {
            langs.delete(lang);
        }
        this.setState({selectedLangs: langs});
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
                        options={this.props.options}
                        onLangsChanged={this.onOptionsLangsChanged}
                        onShow={this.onOptionsShow}
                        onSave={this.onOptionsSave}
                    />

                    <Paper className="app-content" zDepth={2} rounded={false} >
                        <div>
                        {this.props.children}
                        </div>
                    </Paper>
                </div>
            </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    actions: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    options: PropTypes.object.isRequired
};

App.defaultProps = {
    menuOpened: false
};

const mapStateToProps = (state, ownProps) => {
    return {
        loading: state.ajaxCallsInProgress > 0,
        options: state.options,
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(flibooksActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
