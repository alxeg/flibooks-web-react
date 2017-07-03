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

import toast from 'toast.js';
import $ from 'jquery/dist/jquery.min';

class SeriesPage extends BaseBooksPage {
    constructor(props, context) {
        super(props, context);

        this.state = Object.assign(this.state, {
            seriesTitle: props.seriesTitle,
            seriesQuery: props.seriesQuery,
            seriesBooks: [],
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
        this.props.actions.searchBooksSeries(this.state.seriesTitle, this.state.seriesQuery)
            .catch(error => {
                error.then(message => {
                    this.showError(message);
                });
            });
    }

    render() {
        return (
            <div>
                <h1 className="page-title">Series</h1>
                <form onSubmit={this.handleSearchSubmit}>
                    <div style={{display:'flex', flexDirection: 'row', alignItems: 'flex-end',width: '100%'}}>
                        <TextField
                            hintText="Book Series"
                            floatingLabelText="Book Series"
                            name="seriesQuery"
                            style={{flex: 1, margin: '0 0 0 1rem'}}
                            value={this.state.seriesQuery}
                            onChange={this.handleTextFieldChange}
                        />

                        <TextField
                            hintText="Book Title"
                            floatingLabelText="Book Title"
                            name="seriesTitle"
                            style={{flex: 1, margin: '0 0 0 1rem'}}
                            value={this.state.seriesTitle}
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
                {this.props.seriesBooks &&
                    (<form id="selectForm">
                        <Checkbox disabled={this.props.seriesBooks.length==0} style={{marginLeft: '15px'}} label="Select All" onCheck={this.handleSelectAll} />
                        <List>
                            {this.props.seriesBooks.map(book =>
                                (<BookRow
                                    key={book.ID}
                                    book={book}
                                    showAuthor={false}
                                    onBookClick={this.handleBookClick}
                                    onDownloadClick={() => this.handleDownloadClick(book)}
                                    onBookSelection={this.handleBookSelection}
                                    highlightTitle={this.state.seriesTitle}
                                    highlightAuthor={this.state.seriesQuery}
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

SeriesPage.propTypes = {
    actions: PropTypes.object.isRequired,
    seriesTitle: PropTypes.string,
    seriesQuery: PropTypes.string,
    seriesBooks: PropTypes.array,
    book: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {

    const seriesBooks =  state.books && Array.isArray(state.books.seriesBooks) ? state.books.seriesBooks : [];
    const seriesTitle = state.books ? state.books.seriesTitle : '';
    const seriesQuery = state.books ? state.books.seriesQuery : '';
    let book = undefined;
    if (state.bookInfo) {
        book = state.bookInfo.book;
    }

    return {
        seriesBooks,
        seriesTitle,
        seriesQuery,
        book
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(flibooksActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SeriesPage);

