import React from 'react';
import "./Header.css"; // Importing styles specific to the Header component
import { Link } from 'react-router-dom'; // Importing Link for navigation between routes

// Header component to display navigation menu and brand name
const Header = () => {

    // Function to toggle the display of the navigation menu on small screens
    const handleNavClick = () => {
        const navMenu = document.getElementById('nav-menu'); // Accessing the navigation menu by ID
        // Toggle between showing and hiding the navigation menu
        if(navMenu.style.display === 'flex'){
            navMenu.style.display = 'none';
        } else {
            navMenu.style.display = 'flex';
        }
    };

    return (
        <header>
            {/* Menu icon that triggers the navigation menu toggle function */}
            <div id="nav-icon" onClick={() => handleNavClick()}>&#9776;</div> 
            {/* Displaying the brand name of the website */}
            <div id="brand-name"><i>BOOK IT</i></div> 
            {/* Navigation menu containing links to different sections of the app */}
            <nav id="nav-menu">
                <ul>
                    <li><Link to="/">Home</Link></li> {/* Link to Home page */}
                    <li><Link to="/categories">Categories</Link></li> {/* Link to Categories page */}
                    <li><Link to="account">Account</Link></li> {/* Link to Account page */}
                    <li><Link to="cart">Cart</Link></li> {/* Link to Cart page */}
                    <li><Link to="contact">Contact</Link></li> {/* Link to Contact page */}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
