import React from 'react';
import '../css/headerAdmin.css'; // Jangan lupa buat file CSS-nya

const HeaderAdmin = () => {
  return (
    <header className="admin-header">
        <div className='container'>
            <div className="left-section">
                <img src="/logo.png" alt="Logo Maperwa" className="logo" />
                <span className="org-name">MAPERWA ORGANISASI</span>
            </div>
            <div className="right-section">
                <span className="admin-label">Admin</span>
            </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;
