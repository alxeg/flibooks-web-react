import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as flibooksActions from '../../actions/flibooksActions';

import Checkbox from 'material-ui/Checkbox';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';

import BookRow from '../common/BookRow';
import BookUtils from '../common/BookUtils';
import BaseBooksPage from '../common/BaseBooksPage';
import BookDetailsDialog from '../common/BookDetailsDialog';

class AuthorBooksPage extends BaseBooksPage {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        const author = this.props.author;
        const authorId = this.props.match.params.id;
        if ( !this.props.author )  {
            this.props.actions.getAuthor(authorId);
            this.props.actions.getAuthorBooks(authorId);
        } else if ( author.ID != authorId || !Array.isArray(author.books) ) {
            this.props.actions.getAuthorBooks(authorId);
        }
    }

    render() {
        const author = this.props.author;
        return (
            <div>
                {author &&
                    (<form id="selectForm">
                        <h1 className="page-title">{BookUtils.stripSymbols(author.name)}</h1>
                        {author.books &&
                            <div>
                                <Checkbox disabled={author.books.length==0} style={{marginLeft: '15px'}} label="Select All" onCheck={this.handleSelectAll} />
                                <List>
                                    {author.books.map(book =>
                                        (<BookRow
                                            key={book.ID}
                                            book={book}
                                            showAuthor={false}
                                            onBookClick={this.handleBookClick}
                                            onDownloadClick={() => this.handleDownloadClick(book)}
                                            onBookSelection={this.handleBookSelection}
                                        />)
                                    )}
                                </List>
                                <RaisedButton label={"Download "+this.state.booksSelected +" Books"} disabled={this.state.booksSelected==0} primary fullWidth  onClick={this.handleDownloadAllClick}/>
                            </div>
                        }
                    </form>
                    )
                }

                <BookDetailsDialog
                    open={this.state.detailsShown}
                    book={this.props.book}
                    onCloseAction={() => this.setState({detailsShown: false})}
                    onDownloadAction={this.handleDownloadClick}
                    onDownloadEpubAction={this.handleDownloadEpubClick}
                />
            </div>
        );
    }
}

AuthorBooksPage.propTypes = {
    actions: PropTypes.object.isRequired,
    author: PropTypes.object,
    params: PropTypes.object,
    match:  PropTypes.object,
    book: PropTypes.object
};

const getAuthorById = (id, authors) => {
  const found = authors.filter(author => author.ID == id);
  if (found) return found[0];
  return null;
};

const mapStateToProps = (state, ownProps) => {
    let author = undefined;
    let book = undefined;

    const authorId = ownProps.match.params.id;
    if (state.authors.author && state.authors.author.ID == authorId) {
        author = state.authors.author;
    }

    if (state.bookInfo) {
        book = state.bookInfo.book;
    }

    return {
        author,
        book
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(flibooksActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorBooksPage);


