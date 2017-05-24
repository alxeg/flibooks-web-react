import React from 'react';
import PropTypes from 'prop-types';

import { browserHistory } from 'react-router';

import { Tabs, Tab } from 'material-ui/Tabs';

import ActionBook from 'material-ui/svg-icons/action/book';
import SocialPeople from 'material-ui/svg-icons/social/people';
import AvLibraryBooks from 'material-ui/svg-icons/av/library-books';

const NavigationBar = () => {

    const menuItems = [
        {
            path: "/authors",
            icon: <SocialPeople />,
            title: "AUTHORS"
        },
        {
            path: "/books",
            icon: <AvLibraryBooks />,
            title: "BOOKS"
        },
        {
            path: "/library",
            icon: <ActionBook />,
            title: "LIBRARY"
        }
    ];

    const handleActive = (tab) => {
        browserHistory.push(tab.props['value']);
    };

    const getSelectionIndex = () => {
        return menuItems.findIndex(item => item.path === window.location.pathname);
    };

    const getPath = () => {
        return  "/" + window.location.pathname.split("/")[1];
    };

    return (
        <Tabs initialSelectedIndex={getSelectionIndex()} value={getPath()}>
            {menuItems.map((item) => {
                return (<Tab key={item.path}
                            icon={item.icon}
                            value={item.path}
                            onActive={handleActive}
                            label={item.title}
                        />);
            })}
        </Tabs>
    );
};

NavigationBar.propTypes = {
};

export default NavigationBar;