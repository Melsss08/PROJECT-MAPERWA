import React, { useState, useEffect } from 'react';
import '../css/cssUser/aspirasi.css';
import { FaPlus, FaUserCircle } from 'react-icons/fa';

const Aspirasi = () => {
  const [aspirasi, setAspirasi] = useState([]);
  const [nama, setNama] = useState('');
  const [isi, setIsi] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/aspirasi')
      .then(res => res.json())
      .then(data => setAspirasi(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/aspirasi', {
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

      {aspirasi.map((item) => (
        <div key={item.id} className="aspirasi-card">
          <div className="card-header">
            <FaUserCircle className="user-icon" />
            <strong>{item.nama}</strong>
          </div>
          <p>{item.isi}</p>
          <div className="lihat-balasan">Lihat balasan......</div>
        </div>
      ))}
    </div>
  );
};

export default Aspirasi;
