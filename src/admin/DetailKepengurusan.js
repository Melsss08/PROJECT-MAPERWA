import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/cssAdmin/DetailKepengurusan.css';
import { useParams, useNavigate } from 'react-router-dom';

const DetailKepengurusan = () => {
  const { periodeId } = useParams(); // Mengambil periodeId dari URL
  const [anggota, setAnggota] = useState([]);
  const navigate = useNavigate();

  // Mengambil data anggota berdasarkan periodeId
  useEffect(() => {
    const fetchAnggota = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/anggota/${periodeId}`);
        setAnggota(response.data);
      } catch (error) {
        console.error('Error fetching anggota:', error);
      }
    };

    if (periodeId) {
      fetchAnggota();
    }
  }, [periodeId]);

  // Fungsi untuk kembali ke halaman StrukturKepengurusan
  const handleBack = () => {
    navigate('/struktur'); // Kembali ke halaman StrukturKepengurusan
  };

  return (
    <div className="detail-kepengurusan">
      <button onClick={handleBack} className="kembali-button">Kembali</button>
      <h3 className="periode-title">PERIODE TAHUN {periodeId}</h3> {/* Menampilkan judul periode */}
      
      {/* Tabel untuk menampilkan data anggota */}
      <table className="anggota-table">
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
          {anggota.length > 0 ? (
            anggota.map((anggota) => (
              <tr key={anggota.id}>
                <td><img src={`http://localhost:3001/api/uploads/${anggota.gambar}`} alt={anggota.namaLengkap} width="50" height="50" style={{ borderRadius: '50%' }} /></td>
                <td>{anggota.namaLengkap}</td>
                <td>{anggota.jabatan}</td>
                <td>{anggota.periodeId}</td>
                <td>
                  <button onClick={() => navigate(`/struktur/edit/${anggota.id}`)} className="edit-button">Edit</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>Tidak ada anggota di periode ini</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// Fungsi untuk menghapus anggota


export default DetailKepengurusan;
