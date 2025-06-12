import React, { useEffect, useState } from 'react';
import { FaSignOutAlt, FaEdit, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../css/cssAdmin/profilAdmin.css';

const ProfilAdmin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Ambil nama user dari localStorage saat komponen pertama kali dimuat
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername || 'Admin');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    navigate('/masuk'); // redirect ke halaman login setelah logout
  };

  return (
    <div className="profil-admin-container">
      <div className="profil-card">
        <div className="profil-image">
          <FaUserCircle className="profile-icon" />
        </div>
        <h3 className="profil-name">{username}</h3>
        <div className="profil-actions">
          <button className="profil-button" onClick={() => navigate('/edit-profil-admin')}>
            <FaEdit className="button-icon" /> Edit Profil
          </button>
          <button className="profil-button logout" onClick={handleLogout}>
            <FaSignOutAlt className="button-icon" /> Keluar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilAdmin;
