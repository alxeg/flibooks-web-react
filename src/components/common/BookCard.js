import React, {PropTypes} from 'react';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import BookUtils from './BookUtils';

const BookCard = ({book}) => {
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
                />
            </CardActions>
        </Card>
    );
};

BookCard.propTypes = {
    book: PropTypes.object
};

export default BookCard;