import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Navbar.css';
const Navbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username'); // Get username from localStorage

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/">Todo APP</a>
      </div>
      <div className="navbar-menu">
        {username ? (
          <>
            {/* <span className="navbar-item">Hello, </span> */}
            <button className="navbar-item" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <a href="/login" className="navbar-item">Login</a>
            <a href="/register" className="navbar-item">Register</a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
