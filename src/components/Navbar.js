import React from 'react';
import {useAuth0} from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom'

import styles from "./css/navbar.module.css";

const Navbar = () => {
    const {isAuthenticated, user, logout} = useAuth0();
    const navigate = useNavigate();
    const {nickname, picture} = user;
    return (
      <>
        {isAuthenticated && user && (
          <nav className={styles.navContainer}>
            <img
              src={picture}
              alt="Profile pic"
              className={styles.navImage}
              onClick={() => navigate('/')}
            />
            <h3>Welcome, {nickname}</h3>
            <button
              onClick={() => logout({ returnTo: window.location.origin })}
              className='red-btn'
            >
              Logout
            </button>
          </nav>
        )}
      </>
    );
}

export default Navbar
