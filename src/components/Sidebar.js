import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo2.svg';
import heart from '../assets/images/Heart.svg';
import heartWhite from '../assets/images/HeartWhite.svg';
import search from '../assets/images/Search.svg';
import searchWhite from '../assets/images/SearchWhite.svg'; 
import "../App.css";


const Sidebar = (props) => {
  return (
    <div className="Sidebar">
      <img src={logo} className="logo" alt="logo" />
      <Link to="/"className={props.homeStyle ? 'link highlight' : 'link'} >
        <div className="icon">
          <div className={props.homeStyle && "iconBackground"}>
            {props.homeStyle ? (
              <img src={searchWhite} alt="home logo" width="12" style={{margin: '0 5px'}}/>
            ) : (
              <img src={search} alt="home logo" width="12" style={{margin: '0 5px'}}/>
            )}  
          </div> 
          <span>Home</span>
        </div>
      </Link>
      <Link to="/favorites"className={props.favStyle ? 'link highlight' : 'link'} >
        <div className="icon">
          <div className={props.favStyle && "iconBackground"}>
            {props.favStyle ? (
              <img src={heartWhite} alt="home logo" width="12" style={{margin: '0 5px'}}/>
            ) : (
              <img src={heart} alt="home logo" width="22" style={{margin: '0 5px'}}/>
            )}  
          </div> 
          <span>Favorites</span>
        </div>
      </Link>
    </div>
  )
}

export default Sidebar;