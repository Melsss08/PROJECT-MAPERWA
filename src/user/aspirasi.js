import React, { useState, useEffect } from 'react';
import '../css/cssUser/aspirasi.css';
import { FaPlus, FaUserCircle } from 'react-icons/fa';

const Aspirasi = () => {
  const [aspirasi, setAspirasi] = useState([]);
  const [nama, setNama] = useState('');
  const [isi, setIsi] = useState('');
  const [openBalasanId, setOpenBalasanId] = useState(null); // untuk toggle balasan

  useEffect(() => {
    fetch('http://localhost:3001/api/aspirasi')
      .then(res => res.json())
      .then(data => {
        console.log("Data aspirasi:", data);
        if (Array.isArray(data)) {
          setAspirasi(data);
        } else {
          setAspirasi([]);
          console.error("Data bukan array:", data);
        }
      })
      .catch(error => {
        console.error("Fetch error:", error);
        setAspirasi([]);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/api/aspirasi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nama, isi })
    })
      .then(res => res.json())
      .then(data => {
        setAspirasi([data, ...aspirasi]);
        setNama('');
        setIsi('');
      });
  };

  const toggleBalasan = (id) => {
    setOpenBalasanId(openBalasanId === id ? null : id);
  };

  return (
    <div className="aspirasi-container">
      <form onSubmit={handleSubmit} className="aspirasi-form">
        <FaPlus className="plus-icon" />
        <input
          type="text"
          placeholder="Tambahkan Aspirasi Anda"
          value={isi}
          onChange={(e) => setIsi(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nama Anda"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
        />
        <button type="submit">Kirim</button>
      </form>

      {Array.isArray(aspirasi) && aspirasi.map((item) => (
        <div key={item.id} className="aspirasi-card">
          <div className="card-header">
            <FaUserCircle className="user-icon" />
            <strong>{item.nama}</strong>
          </div>
          <p>{item.isi}</p>

          <div
            className="lihat-balasan"
            style={{ cursor: 'pointer', color: 'blue' }}
            onClick={() => toggleBalasan(item.id)}
          >
            {openBalasanId === item.id ? 'Sembunyikan balasan' : 'Lihat balasan......'}
          </div>

          {openBalasanId === item.id && (
            item.balasan ? (
              <div className="balasan-admin">
                <strong>Balasan Admin:</strong>
                <p>{item.balasan}</p>
              </div>
            ) : (
              <div className="balasan-admin">
                <em>Belum ada balasan dari admin.</em>
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default Aspirasi;
