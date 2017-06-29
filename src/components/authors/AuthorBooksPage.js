import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as flibooksActions from '../../actions/flibooksActions';

import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';

import BookRow from '../common/BookRow';
import BookUtils from '../common/BookUtils';
import BookDetailsDialog from '../common/BookDetailsDialog';
import toast from 'toast.js';
import $ from 'jquery/dist/jquery.min';

class AuthorBooksPage extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleBookClick = this.handleBookClick.bind(this);
        this.handleDownloadClick = this.handleDownloadClick.bind(this);
        this.handleDownloadAllClick = this.handleDownloadAllClick.bind(this);

        this.state = {
            detailsShown: false,
            detailsRequested: false
        };
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

    componentWillReceiveProps(nextProps) {
        if (this.state.detailsRequested && nextProps.book) {
            this.setState({
                detailsShown: true,
                detailsRequested: false
            });
        }
    }

    handleBookClick(book) {
        this.setState({detailsRequested: true});
        this.props.actions.getBook(book.ID)
            .catch(error => {
                error.then(message => {
                    this.showError(message);
                });
            });
    }

    showError(message) {
        toast.error({
            message
        });
    }

    handleDownloadClick(book) {
        this.setState({downloadLink: `/api/book/${book.ID}/download`});
        // iframe's onload does not work, so reset link with timeout
        setTimeout(() => {
            this.setState({downloadLink:'about:blank'});
        }, 2000);
    }

    handleDownloadAllClick(e) {
        let formData = $("#selectForm").serialize();
        this.setState({downloadLink: `/api/book/archive?${formData}`});
        // iframe's onload does not work, so reset link with timeout
        setTimeout(() => {
            this.setState({downloadLink:'about:blank'});
        }, 2000);
        $('#selectForm').find('input:checkbox').prop('checked', false);
    }

    render() {
        const author = this.props.author;
        return (
            <div>
                {author &&
                    (<form id="selectForm">
                        <h1 className="page-title">{BookUtils.stripSymbols(author.name)}</h1>
                        {author.books &&
                            <List>
                                {author.books.map(book =>
                                    (<BookRow
                                        key={book.ID}
                                        book={book}
                                        showAuthor={false}
                                        onBookClick={this.handleBookClick}
                                        onDownloadClick={() => this.handleDownloadClick(book)}
                                    />)
                                )}
                            </List>
                        }
                        <RaisedButton label="Download Selected" primary fullWidth  onClick={this.handleDownloadAllClick}/>
                    </form>
                    )
                }

                <BookDetailsDialog
                    open={this.state.detailsShown}
                    book={this.props.book}
                    onCloseAction={() => this.setState({detailsShown: false})}
                    onDownloadAction={this.handleDownloadClick}
                />
                <iframe style={{display:'none'}} src={this.state.downloadLink} onLoad={() => this.setState({downloadLink:'about:blank'})}/>
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


