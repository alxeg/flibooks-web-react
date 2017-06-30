import React from 'react';
import PropTypes from 'prop-types';

import toast from 'toast.js';
import $ from 'jquery/dist/jquery.min';

class BaseBooksComponent extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            detailsShown: false,
            detailsRequested: false
        };

        this.handleBookClick = this.handleBookClick.bind(this);
        this.handleDownloadClick = this.handleDownloadClick.bind(this);
        this.handleDownloadAllClick = this.handleDownloadAllClick.bind(this);

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
        this.setState({downloadLink: `/api/book/${book.ID}/download`});
        // iframe's onload does not work, so reset link with timeout
        setTimeout(() => {
            this.setState({downloadLink:'about:blank'});
        }, 2000);
    }

    handleDownloadAllClick(e) {
        let formData = $("#selectForm").serialize();
        this.setState({downloadLink: `/api/book/archive?${formData}`});
        // iframe's onload does not work, so reset link with timeout
        setTimeout(() => {
            this.setState({downloadLink:'about:blank'});
        }, 4000);
        $('#selectForm').find('input:checkbox').prop('checked', false);
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