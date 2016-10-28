import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as flibooksActions from '../../actions/flibooksActions';

import {List, ListItem} from 'material-ui/List';
import BookRow from '../common/BookRow';
import BookUtils from '../common/BookUtils';
import BookDetailsDialog from '../common/BookDetailsDialog';

class AuthorBooksPage extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleBookClick = this.handleBookClick.bind(this);
        this.handleDownloadClick = this.handleDownloadClick.bind(this);

        this.state = {
            detailsShown: false
        };
    }

    componentWillMount() {
        const author = this.props.author;
        const authorId = this.props.params.id;
        if ( !this.props.author )  {
            this.props.actions.getAuthor(authorId);
            this.props.actions.getAuthorBooks(authorId);
        } else if ( author.ID != authorId || !Array.isArray(author.books) ) {
            this.props.actions.getAuthorBooks(authorId);
        }
    }


    handleBookClick(book) {
        console.log(`Open "${book.title}"`);
        this.setState({detailsShown: true, book});
    }

    handleDownloadClick(book) {
        console.log(`Download "${book.title}"`);
    }

    render() {
        const author = this.props.author;
        return (
            <div>
                {author &&
                    (<div>
                        <h1 className="page-title">{BookUtils.stripSymbols(author.name)}</h1>
                        {author.books &&
                            <List>
                                {author.books.map(book =>
                                    <BookRow
                                        key={book.ID}
                                        book={book}
                                        showAuthor={false}
                                        onBookClick={this.handleBookClick}
                                        onDownloadClick={this.handleDownloadClick}
                                    />
                                )}
                            </List>
                        }
                    </div>
                    )
                }
                <BookDetailsDialog
                    open={this.state.detailsShown}
                    book={this.state.book}
                    onCloseAction={() => this.setState({detailsShown: false})}
                />
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


