import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/InputKepengurusan.css'; // Import CSS file
import { useParams, useNavigate } from 'react-router-dom';

const InputKepengurusan = ({ onCancel }) => {
  const [namaPeriode, setNamaPeriode] = useState('');
  const [namaLengkap, setNamaLengkap] = useState('');
  const [jabatan, setJabatan] = useState('');
  const [periodeId, setPeriodeId] = useState(''); // State untuk periode yang dipilih
  const [gambar, setGambar] = useState(null);
  const [periodes, setPeriodes] = useState([]); // Daftar periode
  const [anggota, setAnggota] = useState({}); // Data anggota yang akan diedit jika ada anggotaId
  const jabatanOptions = ['Ketua', 'Wakil Ketua', 'Sekretaris', 'Bendahara', 'Anggota'];
  const { anggotaId } = useParams();
  const navigate = useNavigate();

  // Ambil data anggota jika anggotaId ada untuk melakukan edit
  useEffect(() => {
    if (anggotaId) {
      const fetchAnggota = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/anggota/${anggotaId}`);
          setNamaLengkap(response.data.namaLengkap);
          setJabatan(response.data.jabatan);
          setPeriodeId(response.data.periodeId); // Mengisi periodeId jika sedang mengedit
          // Set gambar jika ada
        } catch (error) {
          console.error('Error fetching anggota data:', error);
        }
      };
      fetchAnggota();
    }
  }, [anggotaId]);

const handleAddPeriode = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:3001/api/periode/tambah', { namaPeriode });
    console.log('Response:', response.data); // Cek apakah respons dari server sudah sesuai
    alert('Periode berhasil ditambahkan!');
    setNamaPeriode('');
    setPeriodeId(response.data.id); // Menyimpan id periode yang baru ditambahkan
  } catch (error) {
    alert('Gagal menambah periode');
    console.error(error);
  }
};


  const handleAddAnggota = async (e) => {
    e.preventDefault();
    const formData = new FormData();
formData.append('namaLengkap', namaLengkap);
formData.append('jabatan', jabatan);
formData.append('periodeId', periodeId);
formData.append('gambar', gambar); // pastikan gambar disertakan

try {
  const response = await axios.post('http://localhost:3001/inputKepengurusan/anggota/tambah', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  alert('Anggota berhasil ditambahkan!');
  setNamaLengkap('');
  setGambar(null);
} catch (error) {
  alert('Gagal menambah anggota');
  console.error(error.response ? error.response.data : error.message); // Log error detail
}

  };

  // Ambil Daftar Periode
  useEffect(() => {
  const fetchPeriodes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/periode');
      console.log(response.data);  // Cek apakah data periode diterima dengan benar
      setPeriodes(response.data);  // Menyimpan data periode
    } catch (error) {
      console.error('Error fetching periods:', error);
    }
  };

  fetchPeriodes();  // Memanggil fungsi untuk mengambil data periode
}, []);


  return (
    <div>
      <form onSubmit={periodeId ? handleAddAnggota : handleAddPeriode}>
        {!periodeId ? ( // Jika periodeId kosong, tampilkan form untuk menambah periode
          <div className="form-input">
            <label>Masukkan Periode Tahun</label>
            <input
              type="text"
              placeholder="Periode Tahun 2025-2026"
              value={namaPeriode}
              onChange={(e) => setNamaPeriode(e.target.value)}
              required
            />
            <button type="submit">Tambah Periode</button>
          </div>
        ) : ( // Jika periodeId ada, tampilkan form untuk menambah anggota
          <div className="form-input">
            <label>Nama Lengkap</label>
            <input
              type="text"
              placeholder="Nama Anggota"
              value={namaLengkap}
              onChange={(e) => setNamaLengkap(e.target.value)}
              required
            />
            <label>Jabatan</label>
            <select value={jabatan} onChange={(e) => setJabatan(e.target.value)} required>
              {jabatanOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
            <label>Upload Gambar</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setGambar(e.target.files[0])}
              required={!anggotaId} // Gambar hanya wajib jika menambah anggota baru
            />
            <button type="submit">{anggotaId ? 'Update Anggota' : 'Tambah Anggota'}</button>
            {anggotaId && (
              <button type="button" onClick={() => navigate(`/struktur`)}>Batal Menambah Anggota</button>
            )}
          </div>
        )}
      </form>

      <div className="periode-list">
        <h3>Daftar Periode</h3>
        {periodes.length > 0 ? (
          periodes.map((periode) => (
            <div key={periode.id} className="periode-item" onClick={() => setPeriodeId(periode.id)}>
              {periode.namaPeriode} {/* Menampilkan nama periode */}
            </div>
          ))
        ) : (
          <p>Tidak ada periode yang tersedia</p> // Menampilkan pesan jika tidak ada periode
        )}
      </div>

      <button onClick={onCancel}>Batal</button>
    </div>
  );
};

export default InputKepengurusan;
