import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as flibooksActions from '../../actions/flibooksActions';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {GridList, GridTile} from 'material-ui/GridList';
import {List, ListItem} from 'material-ui/List';

import BookCard from '../common/BookCard';

import toast from 'toast.js';

class LibraryPage extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            idQuery: props.idQuery?props.idQuery:'',
            idBooks: []
        };
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
        this.handleDownloadClick = this.handleDownloadClick.bind(this);
    }

    handleTextFieldChange(e) {
        this.setState({
            idQuery: e.target.value
        });
    }

    handleSearchSubmit(event) {
        event.preventDefault();
        this.props.actions.searchBooksById(this.state.idQuery)
            .catch(error => {
                error.then(message => {
                    this.showError(message);
                });
            });
    }

    handleDownloadClick(book) {
        this.setState({downloadLink: `/api/book/${book.ID}/download`});
        // iframe's onload does not work, so reset link with timeout
        setTimeout(() => {
            this.setState({downloadLink:'about:blank'});
        }, 2000);
    }

    handleDownloadEpubClick(book) {
        this.setState({downloadLink: `/api/book/${book.ID}/download?format=epub`});
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
                <h1 className="page-title">Library ID search</h1>
                                <form onSubmit={this.handleSearchSubmit}>
                    <div style={{display:'flex', flexDirection: 'row', alignItems: 'flex-end',width: '100%'}}>
                        <TextField
                            hintText="Search by ID"
                            floatingLabelText="Book ID"
                            style={{flex: 1}}
                            value={this.state.idQuery}
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
                <List>
                    {this.props.idBooks && this.props.idBooks.map(book =>
                        (<BookCard
                            book={book}
                            key={book.ID}
                            onDownloadAction={() => this.handleDownloadClick(book)}
                            onDownloadEpubAction={() => this.handleDownloadEpubClick(book)}
                        />)
                    )}
                </List>
                <iframe style={{display:'none'}} src={this.state.downloadLink} onLoad={() => this.setState({downloadLink:'about:blank'})}/>
            </div>
        );
    }
}

LibraryPage.propTypes = {
    actions: PropTypes.object.isRequired,
    idQuery: PropTypes.string,
    idBooks: PropTypes.array,
};

const mapStateToProps = (state, ownProps) => {
    const idBooks =  state.books && Array.isArray(state.books.idBooks) ? state.books.idBooks : [];

    return {
        idBooks
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(flibooksActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LibraryPage);
