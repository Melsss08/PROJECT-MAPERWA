import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    fetchPeriode();
  }, []);


  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [gambarLama, setGambarLama] = useState('');


  const handleEditPengurus = (pengurus) => {
  setNama(pengurus.namaLengkap);
  setJabatan(pengurus.jabatan);
  setGambar(null); // gambar diset ulang, biar bisa upload baru
  setEditId(pengurus.id);
  setIsEditMode(true);
  setShowAddPengurus(true);
  setGambarLama(pengurus.gambarUrl);
};


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

  const fetchPengurus = (periodeId) => {
    fetch('http://localhost:3001/struktur/periode/${periodeId}')
      .then(res => res.json())
      .then(data => setPengurus(data))
      .catch(err => console.error(err));
  };

  const handleTambahPeriode = async () => {
    if (!tahun) return alert('Tahun tidak boleh kosong');

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
      console.error(err);
      alert('Terjadi kesalahan');
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
  };

  const handleDeletePengurus = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pengurus ini?')) {
      try {
        const response = await fetch('http://localhost:3001/struktur/${id}', {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchPengurus(selectedPeriode.id);
        } else {
          alert('Gagal menghapus data');
        }
      } catch (err) {
        console.error(err);
        alert('Terjadi kesalahan');
      }
    }
  };


const handleSubmitStruktur = async (e) => {
  e.preventDefault();

  if (!nama || !jabatan || !selectedPeriode?.id) {
    console.log({ nama, jabatan, periodeId: selectedPeriode?.id, gambar });
    alert('Lengkapi semua field terlebih dahulu!');
    return;
  }

  try {
    const formData = new FormData();
    formData.append('nama', nama);
    formData.append('jabatan', jabatan);

    formData.append('periodeId', selectedPeriode.id);
    if (gambar) {
      formData.append('gambar', gambar);
    }

    let url = 'http://localhost:3001/struktur';
    let method = 'POST';

    // Jika sedang edit, ubah endpoint dan method
    if (isEditMode && editId) {
      url = ('http://localhost:3001/struktur/${editId}');
      method = 'PUT'; // atau PATCH tergantung API kamu

    }

    const response = await fetch(url, {
      method,
      body: formData,
    });

    const result = await response.json();
    console.log('Response:', result);

    if (response.ok) {
      alert(isEditMode ? 'Data berhasil diperbarui' : 'Data berhasil disimpan');

      // Reset form dan state
      setNama('');
      setJabatan('');
      setGambar(null);
      setGambarLama('');
      setIsEditMode(false);
      setEditId(null);
      setShowAddPengurus(false);

      // Refresh daftar pengurus
      fetchPengurus(selectedPeriode.id);
    } else {
      alert(result.error || 'Gagal menyimpan data');
    }
  } catch (error) {
    console.error('Error saat submit:', error);
    alert('Terjadi kesalahan saat menyimpan data');
  }
};

  // Tampilan daftar periode
  if (!showDetailView) {
    return (
      <div className="struktur-container">
        {!showFormPeriode ? (
          <div className="periode-header">
            <h4>DAFTAR PERIODE</h4>
            <button onClick={() => setShowFormPeriode(true)} className="btn-tambah-periode">
              + Tambah Kepengurusan
            </button>
          </div>
        ) : (
          <div className="periode-form">
            <h3>{isEditMode ? 'EDIT DATA PENGURUS' : 'TAMBAH PENGURUS BARU'}</h3>
            <input
              type="text"
              placeholder="Masukkan Periode Tahun"
              value={tahun}
              onChange={(e) => setTahun(e.target.value)}
              className="input-periode"
            />
            <div className="btn-wrapper">
              <button onClick={() => setShowFormPeriode(false)}>Batal</button>
              <button onClick={handleTambahPeriode}>Tambah</button>
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
                            src={('http://localhost:3001/${item.gambarUrl}')} 
                            alt={item.nama} 
                            className="pengurus-image"
                          />
                        ) : (
                          <div className="placeholder-image"></div>
                        )}
                      </td>
                      <td>{item.namaLengkap}</td>
                      <td>{item.jabatan}</td>
                      <td>{selectedPeriode.tahun}</td>
                      <td className="action-cell">
                        <button className="btn-icon edit" 
                        onClick={() => handleEditPengurus(item)}
                        >
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
            onChange={(e) => setGambar(e.target.files[0])}
          />

          {isEditMode && gambarLama && !gambar && (
          <div style={{ marginTop: '10px' }}>
            <p>Gambar saat ini:</p>
            <img 
              src={('http://localhost:3001/${gambarLama}')} 
              alt="Preview Gambar Lama" 
              style={{ width: '120px', borderRadius: '8px' }}
            />
          </div>
        )}


          <div className="btn-wrapper">
            <button onClick={() => {
              setShowAddPengurus(false);
              setIsEditMode(false);
              setEditId(null);
              setNama('');
              setJabatan('');
              setGambar(null);
            }}>
              Batal
            </button>
            <button onClick={handleSubmitStruktur}>Simpan</button>
          </div>

        </div>
      )}


    </div>
  );
};

export default StrukturKepengurusan;
