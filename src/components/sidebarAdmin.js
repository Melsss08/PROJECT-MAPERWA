import React from 'react';
import { Link } from 'react-router-dom';
import '../css/sidebarAdmin.css'; // pastikan file ini ada

const SidebarAdmin = ({ children }) => {
  return (
    <div className="admin-layout">
      <aside className="sidebar">
        {/* <div className="logo">
          <img src="/logo.png" alt="Logo" />
          <h3>MAPERWA ORGANISASI</h3>
        </div> */}
        <ul>
          <li><Link to="/">📄 Kelola AD/ART</Link></li>
          <li><Link to="/struktur">👥 Struktur Kepengurusan</Link></li>
          <li><Link to="/aspirasi">🗣️ Kelola Aspirasi</Link></li>
          <li><Link to="/jadwal">🗓️ Kelola Jadwal</Link></li>
          <li><Link to="/kontak">📇 Kelola Kontak</Link></li>
        </ul>
      </aside>
      <main className="content">
        {children}
      </main>
    </div>
  );
};

export default SidebarAdmin;
