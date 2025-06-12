import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/cssAdmin/headerAdmin.css';
import { FaUserShield } from 'react-icons/fa';

const HeaderAdmin = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Ambil username dari localStorage saat komponen mount
    const loggedInUser = localStorage.getItem('username');
    if (loggedInUser) {
      setUsername(loggedInUser);
    }
  }, []);

  return (
    <header className="admin-header">
      <div className="container">
        <div className="left-section">
          <img src="/mpm.png" alt="Logo Maperwa" className="logo" />
          <span className="org-name">MAPERWA</span>
        </div>
        <div className="right-section">
          <Link to="/profilAdmin" className="profil-link">
            <FaUserShield className="admin-icon" />
            <span className="admin-label">{username || 'Admin'}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;
