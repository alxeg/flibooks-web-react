import React, {PropTypes} from 'react';

import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';

import {deepOrange500, cyan50, cyan600} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Paper from 'material-ui/Paper';
import ClearFix from 'material-ui/internal/ClearFix';

import Header from './common/Header';

injectTapEventPlugin();

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

const styles = {
    header: {
        position: 'fixed',
        top: 0,
        width: '100%'
    },
    content: {
        marginTop: 130, 
        width: '100%',
        height: 'calc(100% - 130px)', 
        padding: 20,
        overflow: 'auto'
    }
};

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            menuOpened: false
        };

        this.onOptionsClick = this.onOptionsClick.bind(this);
    }

    onOptionsClick() {

    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <Header
                        loading={this.props.loading}
                        onOptionsClick = {this.onOptionsClick}
                        style={styles.header}
                    />
                    <Paper style={styles.content} zDepth={2} rounded={false} >
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
    children: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        loading: state.ajaxCallsInProgress > 0
    };
};

export default connect(mapStateToProps)(App);