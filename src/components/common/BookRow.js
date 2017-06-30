import React from 'react';
import PropTypes from 'prop-types';

import {ListItem} from 'material-ui/List';
import Highlight from 'react-highlighter';

import Checkbox from 'material-ui/Checkbox';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';
import IconButton from 'material-ui/IconButton';

import {cyan500} from 'material-ui/styles/colors';

import BookUtils from './BookUtils';

const BookRow = ({book, showAuthor, highlightTitle, highlightAuthor, onBookClick, onDownloadClick, onBookSelection}) => {

    const getSecondaryLine = () => {
        if (showAuthor) {
            return BookUtils.getBookAuthors(book);
        } else {
            return BookUtils.getBookSeries(book) ;
        }
    };

    const handleItemClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (onBookClick) {
            onBookClick(book);
        }
    };

    const handleDownloadClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (onDownloadClick) {
            onDownloadClick(book);
        }
    };

    const handleBookSelection = (e) => {
        if (onBookSelection) {
            onBookSelection(e.target.checked, book);
        }
    };

    const formattedSize = BookUtils.formatSize(book.file_size);

    return (
        <div className="book-line">
            <ListItem onClick={handleItemClick}
                primaryText={<Highlight matchClass="highlighted" search={BookUtils.getHighlightRegex(highlightTitle)}>{book.title}</Highlight>}
                secondaryText={
                    <p>
                        <Highlight matchClass="highlighted" search={BookUtils.getHighlightRegex(highlightAuthor)}>{getSecondaryLine()}</Highlight>
                    </p>
                }
                secondaryTextLines={1}
                rightIcon={
                    <IconButton
                        iconStyle={{width: 40, height: 40, padding: 0}}
                        onClick={handleDownloadClick}
                        tooltip={formattedSize}>
                            <FileFileDownload className="book-row-download-icon" color={cyan500}  />
                    </IconButton>
                }
                leftCheckbox={
                    <input
                        style={{height: '20px', width: '20px'}}
                        className="bookCheckbox"
                        type="checkbox"
                        name="id" value={book.ID}
                        onClick={(e) => e.stopPropagation()}
                        onChange={handleBookSelection}/>
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
    onDownloadClick: PropTypes.func,
    onBookSelection: PropTypes.func
};

export default BookRow;