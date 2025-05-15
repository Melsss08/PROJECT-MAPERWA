import React, { useEffect, useState } from 'react';
import '../css/cssAdmin/strukturKepengurusan.css';

const StrukturKepengurusan = () => {
  const [tahun, setTahun] = useState('');
  const [daftarPeriode, setDaftarPeriode] = useState([]);
  const [showFormPeriode, setShowFormPeriode] = useState(false);
  const [selectedPeriode, setSelectedPeriode] = useState(null);

  // Form struktur pengurus
  const [nama, setNama] = useState('');
  const [jabatan, setJabatan] = useState('');
  const [gambar, setGambar] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/periode')
      .then(res => res.json())
      .then(data => setDaftarPeriode(data))
      .catch(err => console.error(err));
  }, []);

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
        setDaftarPeriode(prev => [...prev, data]);
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
        setSelectedPeriode(null);
      } else {
        alert('Gagal menyimpan data');
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan');
    }
  };

  return (
    <div className="struktur-container">
      {!showFormPeriode ? (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
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

      <h4>DAFTAR PERIODE</h4>
      <div className="periode-list">
        {daftarPeriode.map((item) => (
          <div
            key={item.id}
            className="periode-item"
            onClick={() => handlePilihPeriode(item)}
          >
            <strong>periode tahun {item.tahun}</strong>
          </div>
        ))}
      </div>

      {selectedPeriode && (
        <div className="form-struktur">
          <h3>PERIODE TAHUN {selectedPeriode.tahun}</h3>
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

          <div className="btn-wrapper">
            <button onClick={() => setSelectedPeriode(null)}>Batal</button>
            <button onClick={handleSubmitStruktur}>Simpan</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StrukturKepengurusan;
