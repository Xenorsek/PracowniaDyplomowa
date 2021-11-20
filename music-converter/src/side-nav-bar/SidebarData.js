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
    }, 
    {
        title: 'Library',
        path: '/library',
        icon: <AiIcons.AiFillPlusCircle />,
        cName: 'nav-text',
    }, 
    {
        title: 'Upload',
        path: '/upload',
        icon: <AiIcons.AiFillDatabase />,
        cName: 'nav-text',
    }, 
    {
        title: 'Uploads',
        path: '/uploads',
        icon: <AiIcons.AiFillStar />,
        cName: 'nav-text',
    }, 
    {
        title: 'Favorites',
        path: '/favorites',
        icon: <IoIcons.IoMdThumbsUp />,
        cName: 'nav-text',
    }, 
];
