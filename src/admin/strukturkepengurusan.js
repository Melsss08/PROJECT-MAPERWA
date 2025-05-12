import React, { useState, useEffect } from 'react'; 
import '../css/strukturkepengurusan.css';
import InputKepengurusan from './InputKepengurusan'; 
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; // Mengimpor useNavigate

const StrukturKepengurusan = () => {
  const [showInput, setShowInput] = useState(false);
  const [periodes, setPeriodes] = useState([]); // State untuk menyimpan data periode
  const [anggota, setAnggota] = useState([]); // State untuk menyimpan data anggota berdasarkan periode yang dipilih
  const [selectedPeriode, setSelectedPeriode] = useState(null); // Periode yang dipilih
  const navigate = useNavigate(); // Inisialisasi useNavigate

  // Ambil data periode dari API
  useEffect(() => {
    const fetchPeriodes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/periode');
        setPeriodes(response.data); // Menyimpan data periode
      } catch (error) {
        console.error('Error fetching periods:', error);
      }
    };

    fetchPeriodes();  // Memanggil fungsi untuk mengambil data periode
  }, []);  // Hanya dijalankan sekali saat komponen pertama kali dimuat

  // Fungsi untuk mengubah periode yang dipilih dan mengarahkannya ke DetailKepengurusan
  const handleSelectPeriode = (periodeId) => {
    navigate(`/detail-kepengurusan/${periodeId}`); // Arahkan ke DetailKepengurusan
  };

  return (
    <div className="strukturkepengurusan-page">
      {!showInput ? (
        <>
          <div className="strukturkepengurusan-header">
            <button className="add-button" onClick={() => setShowInput(true)}>+ Tambah Periode dan Pengurus</button>
          </div>

          {/* Menampilkan daftar periode */}
        <div className="kepengurusan-list">
  {periodes.length > 0 ? (
    periodes.map((periode) => (
      <div 
        key={periode.id} 
        className="kepengurusan-item" 
        onClick={() => handleSelectPeriode(periode.id)} // Menangani klik pada periode
      >
        {periode.namaPeriode} {/* Menampilkan nama periode */}
      </div>
    ))
  ) : (
    <p>Tidak ada periode yang tersedia</p> // Menampilkan pesan jika tidak ada periode
  )}
</div>


          {/* Menampilkan detail anggota setelah periode dipilih */}
          {selectedPeriode && (
            <div className="anggota-list">
              <h3>Anggota Periode Tahun {periodes.find(p => p.id === selectedPeriode)?.namaPeriode}</h3>
              {anggota.length > 0 ? (
                anggota.map((anggota) => (
                  <div key={anggota.id} className="anggota-item">
                    <img src={`http://localhost:3001/api/uploads/${anggota.gambar}`} alt={anggota.namaLengkap} />
                    <div className="anggota-details">
                      <p><strong>Nama:</strong> {anggota.namaLengkap}</p>
                      <p><strong>Jabatan:</strong> {anggota.jabatan}</p>
                      <p><strong>Periode:</strong> {anggota.periodeId}</p>
                    </div>
                    <div className="anggota-actions">
                      <button className="edit-button">Edit</button>
                      <button className="delete-button">Hapus</button>
                    </div>
                  </div>
                ))
              ) : (
                <p>Tidak ada anggota di periode ini</p>
              )}
            </div>
          )}
        </>
      ) : (
        <InputKepengurusan onCancel={() => setShowInput(false)} />
      )}
    </div>
  );
};

export default StrukturKepengurusan;
