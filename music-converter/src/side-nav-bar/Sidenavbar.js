import React,{useState} from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import i18n from "../i18n/i18n";
import * as IoIcons from "react-icons/io";
import './Sidebar.css';
import {IconContext} from'react-icons';
import { useAuthContext } from "../hooks/useAuthContext";
function Sidenavbar() {
  const [ sidebar, setSidebar ] = useState(false);
  const {user} = useAuthContext();
  const showSidebar = () => setSidebar(!sidebar);

  const SidebarData = [
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
  return (
    <div>
        <IconContext.Provider value={{color:'#fff'}}>
      <div className="sidenavbar">
        <Link to="#" className="menu-bars">
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <AiIcons.AiOutlineClose onClick={showSidebar}/>
            </Link>
          </li>
          {!user && (
          SidebarData.filter(item => item.auth ===false).map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })
          )}
          {user && (
          SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })
          )}
        </ul>
      </nav>
      </IconContext.Provider>
    </div>
  );
}
export default Sidenavbar;
