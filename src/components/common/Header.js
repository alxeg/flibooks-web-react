import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

import AppBar from 'material-ui/AppBar';
import LinearProgress from 'material-ui/LinearProgress';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ActionHome from 'material-ui/svg-icons/action/home';

import NavigationBar from './NavigationBar';


const Header = ({loading, onOptionsClick, style}) => {
    const goHome = () => {
        browserHistory.push("/");
    };

    return(
        <div style={style} >
            <AppBar
                title="Flibooks Web Application"
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
                            <MenuItem primaryText="Options" />
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
    style: PropTypes.object
};

export default Header;