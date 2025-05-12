import React, { useState } from 'react';
import '../css/cssAdmin/InputKepengurusan.css';
import { FaPlus, FaUpload } from 'react-icons/fa';
import axios from 'axios';

const InputKepengurusan = ({ onCancel }) => {
  const [periodeTahun, setPeriodeTahun] = useState('');
  const [namaLengkap, setNamaLengkap] = useState('');
  const [jabatan, setJabatan] = useState('');
  const [gambar, setGambar] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!periodeTahun.trim() || !namaLengkap.trim() || !jabatan.trim() || !gambar) {
      alert('Semua kolom wajib diisi!');
      return;
    }
    
    const formData = new FormData();
    formData.append('periodeTahun', periodeTahun);
    formData.append('namaLengkap', namaLengkap);
    formData.append('jabatan', jabatan);
    if (gambar) {
      formData.append('gambar', gambar);
    }

    try {
      await axios.post('http://localhost:3001/inputKepengurusan', formData);
      alert('Data berhasil disimpan');
      onCancel();
    } catch (error) {
      console.error('Gagal menyimpan data:', error);
      alert('Terjadi kesalahan saat menyimpan data');
    }
  };

  return (
    <div className="input-kepengurusan-container">
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <FaPlus className="icon" />
          <input
            type="text"
            placeholder="Masukkan Periode Tahun"
            value={periodeTahun}
            onChange={(e) => setPeriodeTahun(e.target.value)}
            required
          />
        </div>

        <label>Nama Lengkap:</label>
        <div className="input-field">
          <input
            type="text"
            value={namaLengkap}
            onChange={(e) => setNamaLengkap(e.target.value)}
            required
          />
        </div>

        <label>Jabatan:</label>
        <div className="input-field">
          <input
            type="text"
            value={jabatan}
            onChange={(e) => setJabatan(e.target.value)}
            required
          />
        </div>

        <label>Unggah Gambar:</label>
        <div className="input-field upload-wrapper">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setGambar(e.target.files[0])}
          />
          <FaUpload className="icon" />
        </div>

        <div className="button-group">
          <button type="button" className="btn cancel" onClick={onCancel}>
            Batal
          </button>
          <button type="submit" className="btn submit">
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputKepengurusan;
