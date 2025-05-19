import React from 'react';
import '../css/cssUser/Sejarah.css';
import { FaChevronLeft } from 'react-icons/fa'; // icon panah kiri

const Sejarah = () => {
  return (
    <div className="container">
      <h2 className="title">SEJARAH</h2>

      <div className="card sejarah-card">
        <p className="sejarah-text">
          Majelis Permusyawaratan Mahasiswa (MAPERWA) adalah lembaga legislatif tertinggi di lingkungan kampus yang dibentuk sebagai wadah representasi mahasiswa. MPM lahir dari semangat demokrasi kampus untuk menampung aspirasi, menetapkan kebijakan umum, serta mengawasi kinerja Badan Eksekutif Mahasiswa (BEM). Didirikan sejak era reformasi mahasiswa, MPM berperan penting dalam menjaga transparansi dan akuntabilitas organisasi kemahasiswaan.
        </p>
        <div className="sejarah-icon">
          <img src="/logo2.png" alt="Logo" />
        </div>
      </div>

      <div className="card demisioner-card">
        <FaChevronLeft className="icon-left" />
        <div className="demisioner-text">
          <strong>DEMISIONER</strong><br />
          <strong>ANGKATAN 1</strong>
        </div>
      </div>
    </div>
  );
};

export default Sejarah;
