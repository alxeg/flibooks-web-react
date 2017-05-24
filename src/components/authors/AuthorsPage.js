import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as flibooksActions from '../../actions/flibooksActions';

import Highlight from 'react-highlighter';

import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {GridList, GridTile} from 'material-ui/GridList';
import {List, ListItem} from 'material-ui/List';

import SocialPeople from 'material-ui/svg-icons/social/people';

import BookUtils from '../common/BookUtils';

import toast from 'toast.js';

import {
    cyan600,
    deepOrange500
} from 'material-ui/styles/colors';

const style = {margin: 5};

class AuthorsPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            authorsQuery: props.authorsQuery,
            authors: []
        };

        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    }

    handleTextFieldChange(e) {
        this.setState({
            authorsQuery: e.target.value
        });
    }

    handleAuthorClick(author) {
        browserHistory.push(`/authors/${author.ID}`);
    }

    handleSearchSubmit(event) {
        event.preventDefault();
        this.props.actions.searchAuthors(this.state.authorsQuery)
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

    render() {
        return (
            <div>
                <h1 className="page-title">Authors</h1>
                <form onSubmit={this.handleSearchSubmit}>
                    <div style={{display:'flex', flexDirection: 'row', alignItems: 'flex-end',width: '100%'}}>
                        <TextField
                            hintText="Search authors"
                            floatingLabelText="Author"
                            style={{flex: 1}}
                            value={this.state.authorsQuery}
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
                    {this.props.authors.map(author =>
                        <ListItem
                            key={author.ID}
                            className="author-line"
                            primaryText={<Highlight matchClass="highlighted" search={this.state.authorsQuery}>{BookUtils.stripSymbols(author.name)}</Highlight>}
                            leftAvatar={
                                <Avatar
                                    icon={<SocialPeople />}
                                    backgroundColor={cyan600}
                                    size={30}
                                    style={style}
                                    />
                            }
                            onClick={this.handleAuthorClick.bind(this, author)}
                            />
                    )}
                </List>
            </div>
        );
    }
}

AuthorsPage.propTypes = {
    actions: PropTypes.object.isRequired,
    authorsQuery: PropTypes.string,
    authors: PropTypes.array
};

const mapStateToProps = (state, ownProps) => {

    const authors =  state.authors && Array.isArray(state.authors.authors) ? state.authors.authors : [];
    const authorsQuery = state.authors ? state.authors.term : '';

    return {
        authors,
        authorsQuery
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(flibooksActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);

