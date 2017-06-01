import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as flibooksActions from '../../actions/flibooksActions';

class LibraryPage extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <h1 className="page-title">Library ID search</h1>
            </div>
        );
    }
}

LibraryPage.propTypes = {

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

export default connect(mapStateToProps, mapDispatchToProps)(LibraryPage);