import React from 'react';
import PropTypes from 'prop-types';

import toast from 'toast.js';
import $ from 'jquery/dist/jquery.min';
import fileDownload from 'js-file-download';
import contentDisposition from 'content-disposition';

class BaseBooksComponent extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            detailsShown: false,
            detailsRequested: false,
            booksSelected: 0
        };

        this.handleBookClick = this.handleBookClick.bind(this);
        this.handleDownloadClick = this.handleDownloadClick.bind(this);
        this.handleDownloadEpubClick = this.handleDownloadEpubClick.bind(this);
        this.handleDownloadAllClick = this.handleDownloadAllClick.bind(this);
        this.handleSelectAll = this.handleSelectAll.bind(this);
        this.handleBookSelection = this.handleBookSelection.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.detailsRequested && nextProps.book) {
            this.setState({
                detailsShown: true,
                detailsRequested: false
            });
        }
    }

    handleBookClick(book) {
        this.setState({detailsRequested: true});
        this.props.actions.getBook(book.ID)
            .catch(error => {
                error.then(message => {
                    this.showError(message);
                });
            });
    }

    handleDownloadClick(book) {
        let filename = '';
        fetch(`/api/book/${book.ID}/download`)
            .then((response) => {
                let disposition = contentDisposition.parse(response.headers.get('content-disposition'));
                filename = disposition.parameters.filename;

                return response.blob();
            })
            .then((data) => {
                fileDownload(data, filename);
            });
    }

    handleDownloadEpubClick(book) {
        let filename = '';
        fetch(`/api/book/${book.ID}/download?format=epub`)
            .then((response) => {
                let disposition = contentDisposition.parse(response.headers.get('content-disposition'));
                filename = disposition.parameters.filename;

                return response.blob();
            })
            .then((data) => {
                fileDownload(data, filename);
            });
    }

    handleDownloadAllClick(e) {
        let formData = $("#selectForm").serialize();
        this.setState({downloadLink: `/api/book/archive?${formData}`});
        // iframe's onload does not work, so reset link with timeout
        setTimeout(() => {
            this.setState({downloadLink:'about:blank'});
        }, 4000);
        $('#selectForm').find('input:checkbox').prop('checked', false);
        setTimeout(() => {
            this.handleBookSelection();
        }, 100);
    }

    handleSelectAll(e) {
        $('#selectForm').find('.bookCheckbox').prop('checked', e.target.checked);
        setTimeout(this.handleBookSelection, 100);
    }

    handleBookSelection(selected, book) {
        let selNo = $('#selectForm').find('.bookCheckbox:checked').length;
        this.setState({booksSelected: selNo});
    }

    showError(message) {
        toast.error({
            message
        });
    }
}
BaseBooksComponent.propTypes = {
    actions: PropTypes.object.isRequired,
    book: PropTypes.object
};

export default BaseBooksComponent;
