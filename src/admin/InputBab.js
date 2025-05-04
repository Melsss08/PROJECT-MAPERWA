import React, { useState } from 'react';
import '../css/inputBab.css';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';

const InputBab = ({ onCancel }) => {
  const [judul, setJudul] = useState('');
  const [isi, setIsi] = useState('');

  const handleSubmit = async () => {
    if (!judul || !isi) return alert('Semua field harus diisi');

    try {
      await axios.post('http://localhost:3001/babs', { judul, isi });
      alert('Data berhasil disimpan');
      onCancel(); // kembali ke tampilan awal
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan data');
    }
  };

  return (
    <div className="input-bab-container">
      <div className="input-field">
        <FaPlus className="icon" />
        <input
          type="text"
          placeholder="Masukkan Nama Bab"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
        />
      </div>

      <div className="input-area">
        <FaPlus className="icon" />
        <textarea
          placeholder="Masukkan Isi Bab"
          value={isi}
          onChange={(e) => setIsi(e.target.value)}
        />
      </div>

      <div className="button-group">
        <button className="btn cancel" onClick={onCancel}>Batal</button>
        <button className="btn submit" onClick={handleSubmit}>Selesai</button>
      </div>
    </div>
  );
};

export default InputBab;
