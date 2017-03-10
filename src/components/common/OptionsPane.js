import React, { Component, PropTypes } from 'react';

import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';

const OptionsPane = ({open, onClose}) => {

    return (
        <Drawer
            docked={false}
            width={300}
            open={open}
            openSecondary
            onRequestChange={onClose}
        >
            <AppBar title="Options" />
        </Drawer>
    );
};

OptionsPane.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default OptionsPane;
