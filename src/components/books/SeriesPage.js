import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as flibooksActions from '../../actions/flibooksActions';

class SeriesPage extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <h1 className="page-title">Series</h1>
            </div>
        );
    }
}

SeriesPage.propTypes = {

};

const mapStateToProps = (state, ownProps) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(flibooksActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SeriesPage);