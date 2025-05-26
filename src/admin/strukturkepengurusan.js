import React, { useEffect, useState } from 'react';
import '../css/cssAdmin/strukturKepengurusan.css';

const StrukturKepengurusan = () => {
  const [tahun, setTahun] = useState('');
  const [daftarPeriode, setDaftarPeriode] = useState([]);
  const [showFormPeriode, setShowFormPeriode] = useState(false);
  const [selectedPeriode, setSelectedPeriode] = useState(null);
  const [pengurus, setPengurus] = useState([]);
  const [showDetailView, setShowDetailView] = useState(false);

  const [nama, setNama] = useState('');
  const [jabatan, setJabatan] = useState('');
  const [gambar, setGambar] = useState(null);
  const [showAddPengurus, setShowAddPengurus] = useState(false);

  useEffect(() => {
    fetchPeriode();
  }, []);

  const fetchPeriode = () => {
    fetch('http://localhost:3001/periode')
      .then(res => res.json())
      .then(data => {
        const sortedData = [...data].sort((a, b) => b.id - a.id);
        setDaftarPeriode(sortedData);
      })
      .catch(err => console.error(err));
  };

  const fetchPengurus = (periodeId) => {
    fetch(`http://localhost:3001/struktur/periode/${periodeId}`)
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
        const response = await fetch(`http://localhost:3001/struktur/${id}`, {
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

  const handleSubmitStruktur = async () => {
    if (!nama || !jabatan || !gambar) return alert('Lengkapi semua data');

    const formData = new FormData();
    formData.append('nama', nama);
    formData.append('jabatan', jabatan);
    formData.append('gambar', gambar);
    formData.append('periodeId', selectedPeriode.id);

    try {
      const response = await fetch('http://localhost:3001/struktur', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Data berhasil disimpan');
        setNama('');
        setJabatan('');
        setGambar(null);
        setShowAddPengurus(false);
        fetchPengurus(selectedPeriode.id);
      } else {
        alert('Gagal menyimpan data');
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan');
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
            <h3>MASUKKAN PERIODE TAHUN</h3>
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
              {item.tahun}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Tampilan detail pengurus
  return (
    <div className="struktur-container">
      <h3>Struktur Kepengurusan Tahun {selectedPeriode.tahun}</h3>
      <button onClick={handleKembali}>Kembali</button>
      <button onClick={handleAddPengurus}>+ Tambah Pengurus</button>

      {showAddPengurus && (
        <div className="form-pengurus">
          <input
            type="text"
            placeholder="Nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
          <input
            type="text"
            placeholder="Jabatan"
            value={jabatan}
            onChange={(e) => setJabatan(e.target.value)}
          />
          <input
            type="file"
            onChange={(e) => setGambar(e.target.files[0])}
          />
          <button onClick={handleSubmitStruktur}>Simpan</button>
        </div>
      )}

      <div className="pengurus-list">
        {pengurus.map((item) => (
          <div key={item.id} className="pengurus-item">
            <img src={`http://localhost:3001/uploads/${item.gambar}`} alt={item.nama} />
            <h4>{item.nama}</h4>
            <p>{item.jabatan}</p>
            <button onClick={() => handleDeletePengurus(item.id)}>Hapus</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StrukturKepengurusan;
