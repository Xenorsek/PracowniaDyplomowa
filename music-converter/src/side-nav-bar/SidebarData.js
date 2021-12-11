import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import i18n from "../i18n/i18n";

export const SidebarData = [
    {
        title: i18n.t('NavBar.0.Home'),
        path: '/',
        icon: <AiIcons.AiFillPlusCircle />,
        cName: 'nav-text',
        auth: false,
    }, 
    {
        title: i18n.t('NavBar.1.Library'),
        path: '/library',
        icon: <AiIcons.AiFillPlusCircle />,
        cName: 'nav-text',
        auth: false,
    }, 
    {
        title: i18n.t('NavBar.2.Upload'),
        path: '/upload',
        icon: <AiIcons.AiFillDatabase />,
        cName: 'nav-text',
        auth: true,
    }, 
    {
        title: i18n.t('NavBar.3.Uploads'),
        path: '/uploads',
        icon: <AiIcons.AiFillStar />,
        cName: 'nav-text',
        auth: true,
    }, 
    {
        title: i18n.t('NavBar.4.Favorites'),
        path: '/favorites',
        icon: <IoIcons.IoMdThumbsUp />,
        cName: 'nav-text',
        auth: true,
    }, 
];
