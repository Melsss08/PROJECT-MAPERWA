import React from 'react';
import { FaEdit } from 'react-icons/fa';
import '../css/detailBabPasal.css';

const DetailBabPasal = ({ bab, onBack }) => {
  // Pastikan bab ada dan memiliki data yang diperlukan
  if (!bab) {
    return <div>Loading...</div>; // Jika data bab belum diterima
  }

  return (
    <div className="detail-container">
      <div className="detail-card">
        <div className="edit-icon">
          <FaEdit />
        </div>

        <div className="title-section">
          {/* Menampilkan judul bab yang diambil dari database */}
          <h3>{bab.judul}</h3>
          <h3>{bab.bab}</h3> {/* Pastikan bab ada dalam data */}
          <h2>{bab.ketentuan_umum}</h2> {/* Menampilkan ketentuan umum */}
          <h4>{bab.pasal}</h4> {/* Menampilkan pasal */}
        </div>

        <div className="content-box">
          {/* Menampilkan isi bab yang diambil dari database */}
          <p>{bab.isi}</p>
        </div>

        <div className="content-box">
          {/* Menampilkan konten tambahan jika ada */}
          {bab.isiTambahan && <p>{bab.isiTambahan}</p>}
        </div>

        <div className="button-container">
          <button className="back-button" onClick={onBack}>Kembali</button>
        </div>
      </div>
    </div>
  );
};

export default DetailBabPasal;
