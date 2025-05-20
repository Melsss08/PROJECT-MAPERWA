import React, { useState } from 'react';
import '../css/InputKepengurusan.css';
import { FaPlus, FaUpload } from 'react-icons/fa';
import axios from 'axios';

const InputKepengurusan = ({ onCancel }) => {
  const [periodeTahun, setPeriodeTahun] = useState('');
  const [namaLengkap, setNamaLengkap] = useState('');
  const [jabatan, setJabatan] = useState('');
  const [gambar, setGambar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    // Validasi form
    if (!periodeTahun.trim() || !namaLengkap.trim() || !jabatan.trim() || !gambar) {
      setError('Semua kolom wajib diisi!');
      setIsLoading(false);
      return;
    }
    
    // Membuat FormData untuk mengirim data termasuk gambar
    const formData = new FormData();
    formData.append('periodeTahun', periodeTahun);
    formData.append('namaLengkap', namaLengkap);
    formData.append('jabatan', jabatan);
    formData.append('gambar', gambar);
    
    try {
      // Debugging - lihat data yang dikirim
      console.log('Mengirim data:', {
        periodeTahun,
        namaLengkap,
        jabatan,
        gambar: gambar.name
      });
      
      // Mengirim data ke server dengan POST request
      const response = await axios.post(
        'http://localhost:3001/inputKepengurusan', 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      console.log('Response:', response.data);
      setSuccess('Data berhasil disimpan');
      
      // Reset form setelah berhasil
      setPeriodeTahun('');
      setNamaLengkap('');
      setJabatan('');
      setGambar(null);
      
      // Tunggu sebentar sebelum menutup form
      setTimeout(() => {
        onCancel();
      }, 1500);
      
    } catch (error) {
      console.error('Gagal menyimpan data:', error);
      setError(error.response?.data?.error || 'Terjadi kesalahan saat menyimpan data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="input-kepengurusan-container">
      <h2>Tambah Pengurus Baru</h2>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      {success && (
        <div className="success-message">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Periode Tahun:</label>
          <input
            
            
            type="text"
            
            value={periodeTahun}
            onChange={(e) => setPeriodeTahun(e.target.value)}
            placeholder="Contoh: 2023-2024"
            required
          />
        </div>

        <div className="form-group">
          <label>Nama Lengkap:</label>
          <input
            type="text"
            value={namaLengkap}
            onChange={(e) => setNamaLengkap(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Jabatan:</label>
          <input
            type="text"
            value={jabatan}
            onChange={(e) => setJabatan(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Unggah Gambar:</label>
          <div className="file-input">
            <input
              type="file"
              id="gambar"
              onChange={(e) => setGambar(e.target.files[0])}
              accept="image/*"
              required
            />
            <label htmlFor="gambar" className="upload-button">
              <FaUpload /> Pilih File
            </label>
            <span className="file-name">
              {gambar ? gambar.name : 'Belum ada file dipilih'}
            </span>
          </div>
        </div>

        <div className="button-group">
          <button 
            type="button" 
            className="cancel-button"
            onClick={onCancel}
          >
            Batal
          </button>
          <button 
            type="submit" 
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputKepengurusan;
