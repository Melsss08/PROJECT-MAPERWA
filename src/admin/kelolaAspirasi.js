import React, { useEffect, useState } from 'react';
import '../css/cssAdmin/kelolaAspirasi.css';

const KelolaAspirasi = () => {
  const [aspirasiList, setAspirasiList] = useState([]);
  const [selectedAspirasi, setSelectedAspirasi] = useState(null);
  const [balasan, setBalasan] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/aspirasi')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAspirasiList(data);
        } else if (data.data && Array.isArray(data.data)) {
          setAspirasiList(data.data);
        } else {
          console.error('Format data tidak valid:', data);
          setAspirasiList([]);
        }
      })
      .catch(err => console.error('Gagal fetch data:', err));
  }, []); // <-- penutup useEffect

  const handleView = (aspirasi) => {
    setSelectedAspirasi(aspirasi);
    setBalasan(aspirasi.balasan || '');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus aspirasi ini?')) return;

    try {
      const response = await fetch(`http://localhost:3001/api/aspirasi/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Gagal menghapus aspirasi');

      setAspirasiList(aspirasiList.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat menghapus aspirasi.');
    }
  };

  const handleKirimBalasan = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/aspirasi/${selectedAspirasi.id}/balasan`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ balasan }),
      });

      if (!response.ok) throw new Error('Gagal mengirim balasan');

      const updatedList = aspirasiList.map((item) =>
        item.id === selectedAspirasi.id ? { ...item, balasan } : item
      );

      setAspirasiList(updatedList);
      setSelectedAspirasi(null);
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat mengirim balasan.');
    }
  };

  return (
    <div className="kelola-aspirasi-container">
      <h2>Kelola Aspirasi</h2>
      <table className="aspirasi-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Aspirasi</th>
            <th>Balasan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(aspirasiList) && aspirasiList.map((aspirasi, index) => (
            <tr key={aspirasi.id}>
              <td>{index + 1}</td>
              <td>{aspirasi.nama}</td>
              <td>{aspirasi.isi}</td>
              <td>{aspirasi.balasan || '-'}</td>
              <td>
                <button onClick={() => handleView(aspirasi)}>Lihat</button>
                <button onClick={() => handleDelete(aspirasi.id)} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedAspirasi && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p className="aspirasi-nama"><strong>{selectedAspirasi.nama}</strong></p>
            <p className="aspirasi-isi">{selectedAspirasi.isi}</p>

            {selectedAspirasi.balasan && (
              <div className="aspirasi-balasan">
                <strong>Balasan Sebelumnya:</strong>
                <p>{selectedAspirasi.balasan}</p>
              </div>
            )}

            <textarea
              placeholder="Masukkan Balasan"
              value={balasan}
              onChange={(e) => setBalasan(e.target.value)}
              className="textarea-balasan"
            />

            <div className="modal-buttons">
              <button onClick={() => setSelectedAspirasi(null)}>Batal</button>
              <button onClick={handleKirimBalasan}>Kirim</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KelolaAspirasi;
