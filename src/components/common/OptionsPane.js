import React, { Component, PropTypes } from 'react';

import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Checkbox from 'material-ui/Checkbox';

import { Grid, Cell } from 'react-flexr';

const OptionsPane = ({open, options, onChanged}) => {

    return (
        <Drawer
            docked={false}
            width={300}
            open={open}
            openSecondary
            onRequestChange={onChanged}
        >
            <AppBar title="Options" />

            {options.langs &&
                <Grid>
                        {Object.keys(options.langs).map( lang => {
                            return (
                                <Cell key={lang}>
                                    <Checkbox
                                        label={lang}
                                        defaultChecked={options.langs[lang]}
                                    />
                                </Cell>
                            );
                        })}
                </Grid>
            }
        </Drawer>
    );
};

OptionsPane.propTypes = {
    open: PropTypes.bool.isRequired,
    options: PropTypes.object.isRequired,
    onChanged: PropTypes.func.isRequired
};

export default OptionsPane;
