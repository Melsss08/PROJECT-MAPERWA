import React from 'react';
import '../css/cssUser/Sejarah.css';
import { FaChevronLeft } from 'react-icons/fa';

const Sejarah = () => {
  return (
    <div className="sejarah-container">
      <h2 className="sejarah-title">SEJARAH</h2>

      <div className="sejarah-card">
        <p className="sejarah-text">
          Majelis Permusyawaratan Mahasiswa (MAPERWA) adalah lembaga legislatif tertinggi di lingkungan kampus yang dibentuk sebagai wadah representasi mahasiswa. MPM lahir dari semangat demokrasi kampus untuk menampung aspirasi, menetapkan kebijakan umum, serta mengawasi kinerja Badan Eksekutif Mahasiswa (BEM). Didirikan sejak era reformasi mahasiswa, MPM berperan penting dalam menjaga transparansi dan akuntabilitas organisasi kemahasiswaan.
        </p>
        <div className="sejarah-icon">
          <img src="/logo2.png" alt="Logo" />
        </div>
      </div>

      <div className="sejarah-demisioner-card">
        <FaChevronLeft className="sejarah-icon-left" />
        <div className="sejarah-demisioner-text">
          <strong>DEMISIONER</strong><br />
          <strong>ANGKATAN 1</strong>
        </div>
      </div>
    </div>
  );
};

export default Sejarah;