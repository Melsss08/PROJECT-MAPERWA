import React from 'react';
import { Link } from 'react-router-dom';
import { FaFile, FaUsers, FaComment, FaCalendarAlt, FaAddressBook } from 'react-icons/fa'; // Import ikon yang digunakan
import '../css/cssAdmin/sidebarAdmin.css';

const SidebarAdmin = ({ children }) => {
  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <ul>
          <li><Link to="/"><FaFile className="sidebar-icon" /> Kelola AD/ART</Link></li>
          <li><Link to="/struktur"><FaUsers className="sidebar-icon" /> Struktur Kepengurusan</Link></li>
          <li><Link to="/kelolaAspirasi"><FaComment className="sidebar-icon" /> Kelola Aspirasi</Link></li>
          <li><Link to="/jadwal"><FaCalendarAlt className="sidebar-icon" /> Kelola Jadwal</Link></li>
          <li><Link to="/kontak"><FaAddressBook className="sidebar-icon" /> Kelola Kontak</Link></li>
        </ul>
      </aside>
      <main className="content">
        {children}
      </main>
    </div>
  );
};

export default SidebarAdmin;
