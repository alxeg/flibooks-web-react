import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import AppBar from 'material-ui/AppBar';

const Header = ({loading, onMenuClick}) => {
    return(
        <AppBar
            title="Flibooks Web Applicarion"
            onLeftIconButtonTouchTap={onMenuClick}
            iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
      );
};
Header.propTypes = {
    loading: PropTypes.bool.isRequired,
    onMenuClick: PropTypes.func.isRequired
};

export default Header;