import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import LinearProgress from 'material-ui/LinearProgress';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ActionHome from 'material-ui/svg-icons/action/home';

import NavigationBar from './NavigationBar';


const Header = ({loading, onOptionsClick, style, history}) => {
    const goHome = () => {
        history.push("/");
    };

    const goLibrary = () => {
        history.push("/library");
    };

    return(
        <div style={style} >
            <AppBar
                title="Flibooks Backup"
                zDepth={0}
                iconElementLeft={
                    <IconButton onClick={goHome}>
                        <ActionHome />
                    </IconButton>
                }
                iconElementRight={
                    <IconMenu
                        iconButtonElement={
                            <IconButton><MoreVertIcon /></IconButton>
                        }
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    >
                            <MenuItem primaryText="Options"
                                onClick={onOptionsClick} />
                            <MenuItem primaryText="ID Search"
                                onClick={goLibrary} />

                    </IconMenu>
                }
            />
            <NavigationBar />
            <div style={{margin: 2}}>
                {loading && <LinearProgress mode="indeterminate" />}
            </div>
        </div>
      );
};

Header.propTypes = {
    loading: PropTypes.bool.isRequired,
    onOptionsClick: PropTypes.func.isRequired,
    onIdSearchClick: PropTypes.func,
    style: PropTypes.object,
    history: PropTypes.object

};

export default withRouter(Header);