import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as flibooksActions from '../../actions/flibooksActions';

class AuthorBooksPage extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <h1>{this.props.author.name}</h1>
            </div>
        );
    }
}

AuthorBooksPage.propTypes = {
    author: PropTypes.object

};

const getAuthorById = (id, authors) => {
  const found = authors.filter(author => author.ID == id);
  if (found) return found[0]; 
  return null;
};

const mapStateToProps = (state, ownProps) => {
    debugger;
    
    let author = {name: 'NOT FOUND'};
    
    const authorId = ownProps.params.id;
    if (authorId && state.authors.length > 0) {
        author = getAuthorById(authorId, state.authors);
    }

    return {
        author
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(flibooksActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorBooksPage);
