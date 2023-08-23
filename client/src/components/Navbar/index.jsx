import React, {useEffect, useState} from 'react'
import './styles.css'
import Logo from '../../assets/Logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faCalendar, faBowlFood,faStickyNote } from '@fortawesome/free-solid-svg-icons';
import {useLocation} from "react-router";

function Navbar() {
    const location = useLocation(); // once ready it returns the 'window.location' object
    const [url, setUrl] = useState(null);
    useEffect(() => {
        setUrl(location.pathname);
    }, [location]);
    function handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('authenticated')
        window.location = '/';   
      }

  return (
    <nav className="navbar">
        <img src={Logo} alt="image" className="image-logo"/>
      <ul>
        <a href="/" className={(url === "/" ?" active" : "")}><FontAwesomeIcon icon={faBowlFood} />Online Recipes</a>
        <a href="/shopping-list" className={(url === "/shopping-list" ?" active" : "")}><FontAwesomeIcon  icon={faStickyNote}/>Shopping List</a>
        <a href="/plan-meal" className={(url === "/plan-meal" ?" active" : "")}><FontAwesomeIcon icon={faCalendar} />Plan Meals</a>
          <a href="/" onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} />Logout</a>
      </ul>
    </nav>
  )
}

export default Navbar