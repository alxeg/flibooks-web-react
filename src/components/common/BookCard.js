import React from 'react';
import PropTypes from 'prop-types';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import BookUtils from './BookUtils';

const BookCard = ({book, onDownloadAction}) => {
    const descriptionLink = "http://flisland.net/b/"+book.lib_id;
    const formattedSize = BookUtils.formatSize(book.file_size);
    return (
        <Card>
            <CardHeader
                title={<div className="description-authors">{BookUtils.getBookAuthors(book)}</div>}/>
            <CardText style={{marginTop: '-20px'}}>
                <div className="description-title">{book.title}</div>
                {book.series &&
                    <div className="description-series">
                        «{book.series}{book.ser_no && <span>{' '}[{book.ser_no}]</span>}»
                    </div>
                }
                <Divider />
                <div style={{display:'flex', flexDirection: 'row', alignItems: 'flex-end', width: '100%', paddingTop: '10px'}}>
                    <span className="description-size" style={{flex: 1}}>{formattedSize}</span>
                    <span className="description-lang" style={{flex: 1}}>{book.lang}</span>
                </div>
                <div style={{display:'flex', flexDirection: 'row', alignItems: 'flex-end', width: '100%', paddingTop: '10px'}}>
                    <span className="description-genres" style={{flex: 1}}>
                        {book.genres && book.genres.map(genre =>
                            (<span key={genre.genre_code}>{genre.genre_code} </span>)
                        )}
                    </span>
                    <span className="description-size" style={{flex: 1}}>
                        <div className="description-link"><a target="_blank"  href={descriptionLink}>Open Description</a></div>
                    </span>
                </div>
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