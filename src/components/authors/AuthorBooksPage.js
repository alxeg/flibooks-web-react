import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as flibooksActions from '../../actions/flibooksActions';

class AuthorBooksPage extends Component {
    constructor(props, context) {
        super(props, context);
    }
    
    componentWillMount() {
        if ( !this.props.author )  {
            this.props.actions.getAuthor(this.props.params.id);
            this.props.actions.getAuthorBooks(this.props.params.id);
        } else if ( this.props.author.ID != this.props.params.id || !Array.isArray(this.props.author.books) ) {
            this.props.actions.getAuthorBooks(this.props.params.id);
        }
    }

    render() {
        return (
            <div>
                <h1>{this.props.author && this.props.author.name}</h1>
            </div>
        );
    }
}

AuthorBooksPage.propTypes = {
    actions: PropTypes.object.isRequired,
    author: PropTypes.object,
    params: PropTypes.object
};

const getAuthorById = (id, authors) => {
  const found = authors.filter(author => author.ID == id);
  if (found) return found[0]; 
  return null;
};

const mapStateToProps = (state, ownProps) => {
    let author = undefined;
    
    const authorId = ownProps.params.id;
    if (state.authors.author && state.authors.author.ID == authorId) {
        author = state.authors.author;
    } else if (authorId && state.authors.authors.length > 0) {
        author = getAuthorById(authorId, state.authors.authors);
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


