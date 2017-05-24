import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import BookCard from './BookCard';

class BookDetailsDialog extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onRequestClose={this.props.onCloseAction}
                    actions={
                        <FlatButton primary label="Close" onTouchTap={this.props.onCloseAction} />
                    }>
                    <BookCard
                        book={this.props.book}
                        onDownloadAction={this.props.onDownloadAction}
                    />
                </Dialog>
            </div>
        );
    }
}

BookDetailsDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    book: PropTypes.object,
    onCloseAction: PropTypes.func,
    onDownloadAction: PropTypes.func
};

export default BookDetailsDialog;