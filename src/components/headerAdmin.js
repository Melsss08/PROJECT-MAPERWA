import React from 'react';
import '../css/cssAdmin/headerAdmin.css'; // Jangan lupa buat file CSS-nya
import { FaUserShield } from 'react-icons/fa'; // Menggunakan React Icons untuk ikon admin

const HeaderAdmin = () => {
  return (
    <header className="admin-header">
      <div className="container">
        <div className="left-section">
          <img src="/logo2.png" alt="Logo Maperwa" className="logo" />
          <span className="org-name">MAPERWA</span>
        </div>
        <div className="right-section">
          <FaUserShield className="admin-icon" /> {/* Menambahkan ikon admin */}
          <span className="admin-label">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;
