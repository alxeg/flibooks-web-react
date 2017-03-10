import React, { Component, PropTypes } from 'react';

import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class OptionsPane extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {open: false};
    }

    render() {
        return (
            <div>
                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    <AppBar title="Options" />
                </Drawer>
            </div>
        );
    }
}

OptionsPane.propTypes = {

};

const mapStateToProps = (state, ownProps) => {
    return {
        open: state.open
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OptionsPane);
