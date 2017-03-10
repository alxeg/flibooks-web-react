import React, { Component, PropTypes } from 'react';

import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';

const OptionsPane = ({open, onChanged}) => {

    return (
        <Drawer
            docked={false}
            width={300}
            open={open}
            openSecondary
            onRequestChange={onChanged}
        >
            <AppBar title="Options" />
        </Drawer>
    );
};

OptionsPane.propTypes = {
    open: PropTypes.bool.isRequired,
    onChanged: PropTypes.func.isRequired
};

export default OptionsPane;
