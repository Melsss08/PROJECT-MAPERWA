import React, { useState } from 'react';
import '../css/inputBab.css';
import { FaPlus } from 'react-icons/fa';

const InputBab = ({ onCancel }) => {
  const [judul, setJudul] = useState('');
  const [isi, setIsi] = useState('');

  // Menangani pengiriman form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!judul || !isi) {
      alert("Judul dan isi harus diisi");
      return;
    }

    try {
      const response = await fetch('/api/babs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ judul, isi }),
      });

      const data = await response.json();

      if (response.ok) {
        // Jika berhasil
        console.log('Bab berhasil ditambahkan:', data);
      } else {
        // Jika terjadi error
        console.error('Gagal menambah bab:', data.error);
      }
    } catch (err) {
      console.error('Error:', err);
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
