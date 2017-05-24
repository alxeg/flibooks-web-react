import React from 'react';
import PropTypes from 'prop-types';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import BookUtils from './BookUtils';

const BookCard = ({book, onDownloadAction}) => {
    return (
        <Card>
            <CardHeader
                title={book.title}
                subtitle={BookUtils.getBookAuthors(book)} />
            <CardText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </CardText>
            <CardActions>
                <FlatButton
                    primary
                    label="Download"
                    onTouchTap={() => onDownloadAction(book)}
                />
            </CardActions>
        </Card>
    );
};

BookCard.propTypes = {
    book: PropTypes.object,
    onDownloadAction: PropTypes.func
};

export default BookCard;