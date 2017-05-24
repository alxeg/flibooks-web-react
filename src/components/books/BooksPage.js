import React from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as flibooksActions from '../../actions/flibooksActions';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';

import BookRow from '../common/BookRow';
import BookUtils from '../common/BookUtils';
import BookDetailsDialog from '../common/BookDetailsDialog';

import toast from 'toast.js';

class BooksPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            title: props.title,
            author: props.author,
            books: [],
            detailsShown: false
        };

        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);

        this.handleBookClick = this.handleBookClick.bind(this);
        this.handleDownloadClick = this.handleDownloadClick.bind(this);

    }

    handleTextFieldChange(e) {
        let newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }

    handleSearchSubmit(event) {
        event.preventDefault();
        this.props.actions.searchBooks(this.state.title, this.state.author)
            .catch(error => {
                error.then(message => {
                    this.showError(message);
                });
            });
    }

    handleBookClick(book) {
        this.setState({detailsShown: true, book});
    }

    handleDownloadClick(book) {
        this.setState({downloadLink: `/api/book/${book.ID}/download`});
        // iframe's onload does not work, so reset link with timeout
        setTimeout(() => {
            this.setState({downloadLink:'about:blank'});
        }, 2000);
    }

    showError(message) {
        toast.error({
            message
        });
    }

    render() {
        return (
            <div>
                <h1 className="page-title">Books</h1>
                <form onSubmit={this.handleSearchSubmit}>
                    <div style={{display:'flex', flexDirection: 'row', alignItems: 'flex-end',width: '100%'}}>
                        <TextField
                            hintText="Title"
                            floatingLabelText="Title"
                            name="title"
                            style={{flex: 1, margin: '0 0 0 1rem'}}
                            value={this.state.title}
                            onChange={this.handleTextFieldChange}
                        />

                        <TextField
                            hintText="Author"
                            floatingLabelText="Author"
                            name="author"
                            style={{flex: 1, margin: '0 0 0 1rem'}}
                            value={this.state.author}
                            onChange={this.handleTextFieldChange}
                        />

                        <RaisedButton
                            primary
                            label="Search"
                            style={{flex: 0, width: 400, margin: '0 0 0 1rem'}}
                            type="submit"
                        />
                    </div>
                </form>
                {this.props.books &&
                    <List>
                        {this.props.books.map(book =>
                            <BookRow
                                key={book.ID}
                                book={book}
                                showAuthor
                                onBookClick={this.handleBookClick}
                                onDownloadClick={() => this.handleDownloadClick(book)}
                                highlightTitle={this.state.title}
                                highlightAuthor={this.state.author}
                            />
                        )}
                    </List>
                }
                <BookDetailsDialog
                    open={this.state.detailsShown}
                    book={this.state.book}
                    onCloseAction={() => this.setState({detailsShown: false})}
                    onDownloadAction={this.handleDownloadClick}
                />
                <iframe style={{display:'none'}} src={this.state.downloadLink} onLoad={() => this.setState({downloadLink:'about:blank'})}/>

            </div>
        );
    }
}

BooksPage.propTypes = {
    actions: PropTypes.object.isRequired,
    title: PropTypes.string,
    author: PropTypes.string,
    books: PropTypes.array
};

const mapStateToProps = (state, ownProps) => {

    const books =  state.books && Array.isArray(state.books.books) ? state.books.books : [];
    const title = state.books ? state.books.title : '';
    const author = state.books ? state.books.author : '';

    return {
        books,
        title,
        author
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(flibooksActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksPage);

