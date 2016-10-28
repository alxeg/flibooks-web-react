import React, {Component, PropTypes} from 'react';

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
                    <BookCard book={this.props.book}/>
                </Dialog>
            </div>
        );
    }
}

BookDetailsDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    book: PropTypes.object,
    onCloseAction: PropTypes.func
};

export default BookDetailsDialog;