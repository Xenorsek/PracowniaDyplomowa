import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillPlusCircle />,
        cName: 'nav-text',
        auth: false,
    }, 
    {
        title: 'Library',
        path: '/library',
        icon: <AiIcons.AiFillPlusCircle />,
        cName: 'nav-text',
        auth: false,
    }, 
    {
        title: 'Upload',
        path: '/upload',
        icon: <AiIcons.AiFillDatabase />,
        cName: 'nav-text',
        auth: true,
    }, 
    {
        title: 'Uploads',
        path: '/uploads',
        icon: <AiIcons.AiFillStar />,
        cName: 'nav-text',
        auth: true,
    }, 
    {
        title: 'Favorites',
        path: '/favorites',
        icon: <IoIcons.IoMdThumbsUp />,
        cName: 'nav-text',
        auth: true,
    }, 
];
