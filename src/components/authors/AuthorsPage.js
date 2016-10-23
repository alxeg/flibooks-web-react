import React, { PropTypes } from 'react';
import {Link} from 'react-router';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as flibooksActions from '../../actions/flibooksActions';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {GridList, GridTile} from 'material-ui/GridList';

class AuthorsPage extends React.Component {
    
    constructor(props, context) {
        super(props, context);

        this.state = {
            searchFieldValue: '',
            authors: []
        };

        this.onSearchButton = this.onSearchButton.bind(this);
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    }
    
    handleTextFieldChange(e) {
        this.setState({
            searchFieldValue: e.target.value
        });
    }

    onSearchButton() {
        this.props.actions.searchAuthors(this.state.searchFieldValue);
    }

    render() {
        return (
            <div>
                <h1>Authors</h1>
                <form>
                    <div style={{display:'flex', flexDirection: 'row', alignItems: 'flex-end',width: '100%'}}>
                        <TextField
                            hintText="Search authors"
                            floatingLabelText="Author"
                            style={{flex: 1}}
                            value={this.state.searchFieldValue} 
                            onChange={this.handleTextFieldChange}
                        />
                        <RaisedButton 
                            primary
                            label="Search" 
                            style={{flex: 0, width: 400, margin: '0 0 0 1rem'}}
                            onClick={this.onSearchButton}
                        />
                    </div>
                </form>
            </div>
        );
    }
}

AuthorsPage.propTypes = {
    actions: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(flibooksActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);

