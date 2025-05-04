import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/jadwal.css';

export default function Jadwal() {
  const [jadwal, setJadwal] = useState([]);
  const [form, setForm] = useState({ judul: '', isiPesan: '', date: '' });

  const fetchData = async () => {
    const res = await axios.get('http://localhost:3001/jadwal');
    setJadwal(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3001/jadwal', form);
    setForm({ judul: '', isiPesan: '', date: '' });
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Judul" value={form.judul} onChange={e => setForm({ ...form, judul: e.target.value })} required />
        <textarea placeholder="Isi kegiatan" value={form.isiPesan} onChange={e => setForm({ ...form, isiPesan: e.target.value })} required />
        <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
        <button type="submit">Tambah Jadwal</button>
      </form>

      <div className="schedule-list">
        {jadwal.map(s => (
          <div className="card" key={s.id}>
            <p className="date">{new Date(s.date).toLocaleDateString()}</p>
            <h4>{s.judul}</h4>
            <p>{s.isiPesan}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
