import React, { useState } from 'react';
import '../css/InputKepengurusan.css';
import { FaPlus, FaUpload } from 'react-icons/fa';
import axios from 'axios';

const InputKepengurusan = ({ onCancel }) => {
  const [periodeTahun, setPeriodeTahun] = useState('');
  const [namaLengkap, setNamaLengkap] = useState('');
  const [jabatan, setJabatan] = useState('');
  const [gambar, setGambar] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi form
    if (!periodeTahun.trim() || !namaLengkap.trim() || !jabatan.trim() || !gambar) {
      alert('Semua kolom wajib diisi!');
      return;
    }
    
    // Membuat FormData untuk mengirim data termasuk gambar
    const formData = new FormData();
    formData.append('periodeTahun', periodeTahun);
    formData.append('namaLengkap', namaLengkap);
    formData.append('jabatan', jabatan);
    formData.append('gambar', gambar);

    try {
      // Mengirim data ke server dengan POST request
      await axios.post('http://localhost:3001/inputKepengurusan', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Jangan set Content-Type saat menggunakan FormData
        },
      });
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
            required // Pastikan gambar wajib diupload
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
