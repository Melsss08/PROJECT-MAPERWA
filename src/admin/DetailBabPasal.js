import React from 'react';
import { FaEdit } from 'react-icons/fa';
import '../css/detailBabPasal.css';

const DetailBabPasal = ({ bab, onBack }) => {
  return (
    <div className="detail-container">
      <div className="detail-card">
        <div className="edit-icon">
          <FaEdit />
        </div>

        <div className="title-section">
          <h3>{bab.judul}</h3>
          <h4>Pasal I</h4>
        </div>

        <div className="content-box">
          <p>{bab.isi}</p>
        </div>

        <div className="button-container">
          <button className="back-button" onClick={onBack}>Kembali</button>
        </div>
      </div>
    </div>
  );
};

export default DetailBabPasal;
