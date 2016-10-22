import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';

import Header from './common/Header';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            menuOpened: false
        };

        this.toggleMenu = this.toggleMenu.bind(this);
        this.showMenu = this.showMenu.bind(this);
    }

    toggleMenu() {
        this.showMenu(!this.state.menuOpened);
    }

    showMenu(show) {
        this.setState({menuOpened: show});
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <Header
                        loading={this.props.loading}
                        onMenuClick = {this.toggleMenu}
                    />
                    <div>
                        <Drawer
                            docked={false}
                            open={this.state.menuOpened}
                            onRequestChange={this.showMenu}
                        > 
                        <AppBar />
                        </Drawer>
                        {this.props.children}
                    </div>
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