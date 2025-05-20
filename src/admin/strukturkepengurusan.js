import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../css/cssAdmin/strukturKepengurusan.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const StrukturKepengurusan = () => {
  const [tahun, setTahun] = useState('');
  const [daftarPeriode, setDaftarPeriode] = useState([]);
  const [showFormPeriode, setShowFormPeriode] = useState(false);
  const [selectedPeriode, setSelectedPeriode] = useState(null);
  const [pengurus, setPengurus] = useState([]);
  const [showDetailView, setShowDetailView] = useState(false);

  // Form struktur pengurus
  const [nama, setNama] = useState('');
  const [jabatan, setJabatan] = useState('');
  const [gambar, setGambar] = useState(null);
  const [showAddPengurus, setShowAddPengurus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPeriode();
  }, []);

  const fetchPeriode = () => {
    fetch('http://localhost:3001/periode')
      .then(res => res.json())
      .then(data => {
        // Pastikan data terbaru berada di bagian atas
        const sortedData = [...data].sort((a, b) => b.id - a.id);
        setDaftarPeriode(sortedData);
      })
      .catch(err => console.error(err));
  };

  const fetchPengurus = async (periodeId) => {
    try {
      const response = await axios.get(`http://localhost:3001/struktur/periode/${periodeId}`);
      setPengurus(response.data);
    } catch (err) {
      console.error('Failed to fetch pengurus:', err);
      setError('Gagal mengambil data pengurus');
    }
  };

  const handleTambahPeriode = async () => {
    if (!tahun) {
      setError('Tahun tidak boleh kosong');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/periode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tahun }),
      });

      const data = await response.json();
      if (response.ok) {
        // Menambahkan periode baru di awal array (posisi teratas)
        setDaftarPeriode(prev => [data, ...prev]);
        setTahun('');
        setShowFormPeriode(false);
      } else {
        alert(data.error || 'Gagal menambahkan');
      }
    } catch (err) {
      console.error('Failed to add period:', err);
      setError(err.response?.data?.error || 'Gagal menambahkan periode');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePilihPeriode = (periode) => {
    setSelectedPeriode(periode);
    fetchPengurus(periode.id);
    setShowDetailView(true);
  };

  const handleKembali = () => {
    setShowDetailView(false);
    setSelectedPeriode(null);
    setShowAddPengurus(false);
  };

  const handleAddPengurus = () => {
    setShowAddPengurus(true);
    setNama('');
    setJabatan('');
    setGambar(null);
    setError('');
  };

  const handleDeletePengurus = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pengurus ini?')) {
      try {
        await axios.delete(`http://localhost:3001/struktur/${id}`);
        fetchPengurus(selectedPeriode.id);
      } catch (err) {
        console.error('Failed to delete pengurus:', err);
        alert('Gagal menghapus data');
      }
    }
  };

  const handleSubmitStruktur = async () => {
    if (!nama || !jabatan || !gambar) {
      setError('Lengkapi semua data');
      return;
    }

    setIsLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('nama', nama);
    formData.append('jabatan', jabatan);
    formData.append('gambar', gambar);
    formData.append('periodeId', selectedPeriode.id);

    try {
      await axios.post('http://localhost:3001/struktur', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      alert('Data berhasil disimpan');
      setNama('');
      setJabatan('');
      setGambar(null);
      setShowAddPengurus(false);
      fetchPengurus(selectedPeriode.id);
    } catch (err) {
      console.error('Failed to submit pengurus:', err);
      setError(err.response?.data?.error || 'Gagal menyimpan data');
    } finally {
      setIsLoading(false);
    }
  };

  // Tampilan daftar periode
  if (!showDetailView) {
    return (
      <div className="struktur-container">
        {error && <div className="error-message">{error}</div>}
        
        {!showFormPeriode ? (
          <div className="periode-header">
            <h4>DAFTAR PERIODE</h4>
            <button onClick={() => setShowFormPeriode(true)} className="btn-tambah-periode">
              + Tambah Kepengurusan
            </button>
          </div>
        ) : (
          <div className="periode-form">
            <h3>MASUKKAN PERIODE TAHUN</h3>
            <input
              type="text"
              placeholder="Masukkan Periode Tahun"
              value={tahun}
              onChange={(e) => setTahun(e.target.value)}
              className="input-periode"
            />
            <div className="btn-wrapper">
              <button 
                onClick={() => setShowFormPeriode(false)}
                disabled={isLoading}
              >
                Batal
              </button>
              <button 
                onClick={handleTambahPeriode}
                disabled={isLoading}
              >
                {isLoading ? 'Menyimpan...' : 'Tambah'}
              </button>
            </div>
          </div>
        )}

        <div className="periode-list">
          {daftarPeriode.map((item) => (
            <div
              key={item.id}
              className="periode-item"
              onClick={() => handlePilihPeriode(item)}
            >
              <span> {item.tahun}</span>
              <span className="view-periode">Lihat Detail</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Tampilan detail pengurus periode
  return (
    <div className="struktur-detail-container">
      {error && <div className="error-message">{error}</div>}
      
      <h2 className="periode-title">PERIODE TAHUN {selectedPeriode?.tahun}</h2>

      {!showAddPengurus ? (
        <>
          <div className="pengurus-actions">
            <button className="btn-add-pengurus" onClick={handleAddPengurus}>
              + Tambah Pengurus
            </button>
          </div>

          <div className="pengurus-table-container">
            <table className="pengurus-table">
              <thead>
                <tr>
                  <th>Gambar</th>
                  <th>Nama Lengkap</th>
                  <th>Jabatan</th>
                  <th>Periode</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pengurus.length > 0 ? (
                  pengurus.map((item) => (
                    <tr key={item.id}>
                      <td className="gambar-cell">
                        {item.gambarUrl ? (
                          <img
                            src={`http://localhost:3001/${item.gambarUrl}`}
                            alt={item.nama}
                            className="pengurus-image"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'http://localhost:3001/uploads/placeholder.png';
                            }}
                          />
                        ) : (
                          <div className="placeholder-image"></div>
                        )}
                      </td>
                      <td>{item.nama}</td>
                      <td>{item.jabatan}</td>
                      <td>{selectedPeriode.tahun}</td>
                      <td className="action-cell">
                        <button className="btn-icon edit">
                          <FaEdit />
                        </button>
                        <button
                          className="btn-icon delete"
                          onClick={() => handleDeletePengurus(item.id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-data">Belum ada data pengurus</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="btn-kembali-container">
            <button className="btn-kembali" onClick={handleKembali}>
              Kembali
            </button>
          </div>
        </>
      ) : (
        <div className="form-struktur">
          <h3>TAMBAH PENGURUS BARU</h3>
          <label>Nama Lengkap</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />

          <label>Jabatan</label>
          <input
            type="text"
            value={jabatan}
            onChange={(e) => setJabatan(e.target.value)}
          />

          <label>Unggah Gambar</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setGambar(e.target.files[0])}
          />

          <div className="btn-wrapper">
            <button 
              onClick={() => setShowAddPengurus(false)}
              disabled={isLoading}
            >
              Batal
            </button>
            <button 
              onClick={handleSubmitStruktur}
              disabled={isLoading}
            >
              {isLoading ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StrukturKepengurusan;
