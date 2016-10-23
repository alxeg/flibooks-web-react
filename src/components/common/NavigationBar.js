import React, { PropTypes } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import ActionBook from 'material-ui/svg-icons/action/book';
import SocialPeople from 'material-ui/svg-icons/social/people';
import AvLibraryBooks from 'material-ui/svg-icons/av/library-books';
import { browserHistory } from 'react-router';


const NavigationBar = () => {

    const paths = [
        "/authors",
        "/books",
        "/library"
    ];

    const handleActive = (tab) => {
        browserHistory.push(tab.props['value']);
    };

    const getSelectionIndex = () => {
        return paths.indexOf(window.location.pathname);
    };

    return (
        <Tabs initialSelectedIndex={getSelectionIndex()} value={window.location.pathname}>
            <Tab
                icon={<SocialPeople />}
                value={paths[0]}
                onActive={handleActive}
                label="AUTHORS"
            />
            <Tab
                icon={<AvLibraryBooks />}
                value={paths[1]}
                onActive={handleActive}
                label="BOOKS"
            />
            <Tab
                icon={<ActionBook />}
                value={paths[2]}
                label="LIBRARY"
            />
        </Tabs>    
  );
};

NavigationBar.propTypes = {
    curPath: PropTypes.string
};

export default NavigationBar;