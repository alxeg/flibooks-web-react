import React, {PropTypes} from 'react';

import {ListItem} from 'material-ui/List';
import Highlight from 'react-highlighter';

import FileFileDownload from 'material-ui/svg-icons/file/file-download';
import IconButton from 'material-ui/IconButton';

import {cyan500} from 'material-ui/styles/colors';

import BookUtils from './BookUtils';

const BookRow = ({book, showAuthor, highlightTitle, highlightAuthor, onBookClick, onDownloadClick}) => {

    const getSecondaryLine = () => {
        if (showAuthor) {
            return BookUtils.getBookAuthors(book);
        } else {
            return BookUtils.getBookSeries(book) ;
        }
    };

    const getHighlight = (termsString) => {
        if (termsString) {
            return new RegExp(termsString.split(/\s/).map(term => "("+term+")").join("|"));
        } else {
            return "";
        }
    };

    const handleItemClick = (e) => {
        if (onBookClick) {
            e.preventDefault();
            onBookClick(book);
        }
    };

    const handleDownloadClick = (e) => {
        if (onDownloadClick) {
            e.stopPropagation();
            onDownloadClick(book);
        }
    };

    return (
        <div className="book-line">
            <ListItem onClick={handleItemClick}
                primaryText={<Highlight matchClass="highlighted" search={getHighlight(highlightTitle)}>{book.title}</Highlight>}
                secondaryText={
                    <p>
                        <Highlight matchClass="highlighted" search={getHighlight(highlightAuthor)}>{getSecondaryLine()}</Highlight>
                    </p>
                }
                secondaryTextLines={1}
                rightIcon={
                    <IconButton
                        iconStyle={{width: 40, height: 40, padding: 0}}
                        onClick={handleDownloadClick}
                        tooltip="Download">
                            <FileFileDownload className="book-row-download-icon" color={cyan500}  />
                    </IconButton>
                }
            />
        </div>
    );
};

BookRow.propTypes = {
    book: PropTypes.object.isRequired,
    showAuthor: PropTypes.bool.isRequired,
    highlightTitle: PropTypes.string,
    highlightAuthor: PropTypes.string,
    onBookClick: PropTypes.func,
    onDownloadClick: PropTypes.func
};

export default BookRow;