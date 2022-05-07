import React from 'react'

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer>
            <p>{year} &copy; Copyright, all rights reserved</p>
        </footer>
    )
}

export default Footer;
