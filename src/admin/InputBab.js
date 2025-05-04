import React from 'react';
import '../css/inputBab.css';
import { FaPlus } from 'react-icons/fa';

const InputBab = ({ onCancel }) => {
  return (
    <div className="input-bab-container">
      <div className="input-field">
        <FaPlus className="icon" />
        <input type="text" placeholder="Masukkan Nama Bab" />
      </div>

      <div className="input-area">
        <FaPlus className="icon" />
        <textarea placeholder="Masukkan Isi Bab" />
      </div>

      <div className="button-group">
        <button className="btn cancel" onClick={onCancel}>Batal</button>
        <button className="btn submit">Selesai</button>
      </div>
    </div>
  );
};

export default InputBab;
