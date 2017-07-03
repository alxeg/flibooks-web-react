import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as flibooksActions from '../../actions/flibooksActions';

import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';

import BookRow from '../common/BookRow';
import BookUtils from '../common/BookUtils';
import BaseBooksPage from '../common/BaseBooksPage';
import BookDetailsDialog from '../common/BookDetailsDialog';

class BooksPage extends BaseBooksPage {
    constructor(props, context) {
        super(props, context);

        this.state = Object.assign(this.state, {
            books: [],
            detailsShown: false,
            detailsRequested: false
        });

        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);

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
                    (<form id="selectForm">
                        <Checkbox disabled={this.props.books.length==0} style={{marginLeft: '15px'}} label="Select All" onCheck={this.handleSelectAll} />
                        <List>
                            {this.props.books.map(book =>
                                (<BookRow
                                    key={book.ID}
                                    book={book}
                                    showAuthor
                                    onBookClick={this.handleBookClick}
                                    onDownloadClick={() => this.handleDownloadClick(book)}
                                    onBookSelection={this.handleBookSelection}
                                    highlightTitle={this.state.title}
                                    highlightAuthor={this.state.author}
                                />)
                            )}
                        </List>
                        <RaisedButton label={"Download "+this.state.booksSelected +" Books"} disabled={this.state.booksSelected==0} primary fullWidth  onClick={this.handleDownloadAllClick}/>
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

BooksPage.propTypes = {
    actions: PropTypes.object.isRequired,
    title: PropTypes.string,
    author: PropTypes.string,
    books: PropTypes.array,
    book: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {

    const books =  state.books && Array.isArray(state.books.books) ? state.books.books : [];
    const title = state.books ? state.books.title : '';
    const author = state.books ? state.books.author : '';
    let book = undefined;
    if (state.bookInfo) {
        book = state.bookInfo.book;
    }

    return {
        books,
        title,
        author,
        book
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(flibooksActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksPage);

