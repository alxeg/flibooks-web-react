import React, { Component, PropTypes } from 'react';

import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';

import { Grid, Cell } from 'react-flexr';

const OptionsPane = ({open, options, onShow, onLangsChanged}) => {

    return (
        <Drawer
            docked={false}
            width={300}
            open={open}
            openSecondary
            onRequestChange={onShow}
        >
            <AppBar title="Options" />
            <Paper zDepth={2} rounded={false} style={{margin: '10px', padding: '5px', height: 'calc(100% - 75px)' }}>
                {options.langs &&
                    <Grid align="center">
                            {Object.keys(options.langs).map( lang => {
                                return (
                                    <Cell key={lang} size="1/3">
                                        <Checkbox
                                            style={{padding: '5px'}}
                                            name={lang}
                                            label={lang}
                                            defaultChecked={options.langs[lang]}
                                            onCheck={onLangsChanged}
                                        />
                                    </Cell>
                                );
                            })}
                    </Grid>
                }
            </Paper>
        </Drawer>
    );
};

OptionsPane.propTypes = {
    open: PropTypes.bool.isRequired,
    options: PropTypes.object.isRequired,
    onShow: PropTypes.func.isRequired,
    onLangsChanged: PropTypes.func.isRequired
};

export default OptionsPane;
