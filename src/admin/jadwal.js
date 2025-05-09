import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/jadwal.css';

export default function Jadwal() {
  const [jadwal, setJadwal] = useState([]);
  const [form, setForm] = useState({ judul: '', isiPesan: '', date: '' });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    const res = await axios.get('http://localhost:3001/jadwal');
    setJadwal(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      await axios.put(`http://localhost:3001/jadwal/${editId}`, form);
      setEditMode(false);
      setEditId(null);
    } else {
      await axios.post('http://localhost:3001/jadwal', form);
    }
    setForm({ judul: '', isiPesan: '', date: '' });
    fetchData();
  };

  const handleEdit = (item) => {
    setEditMode(true);
    setEditId(item.id);
    setForm({ judul: item.judul, isiPesan: item.isiPesan, date: item.date });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/jadwal/${id}`);
    fetchData();
  };

  return (
    <div className="jadwal-container">
      <h2>Jadwal & Pengumuman</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Judul Kegiatan/Pengumuman"
          value={form.judul}
          onChange={e => setForm({ ...form, judul: e.target.value })}
          required
        />
        <textarea
          placeholder="Deskripsi Kegiatan"
          value={form.isiPesan}
          onChange={e => setForm({ ...form, isiPesan: e.target.value })}
          required
        />
        <input
          type="date"
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
          required
        />
        <button type="submit">{editMode ? 'Simpan Perubahan' : 'Tambah Jadwal'}</button>
      </form>

      <div className="schedule-list">
        {jadwal.map((s) => (
          <div className="card" key={s.id}>
            <p className="date">{new Date(s.date).toLocaleDateString()}</p>
            <h4>{s.judul}</h4>
            <p>{s.isiPesan}</p>
            <div className="card-actions">
              <button onClick={() => handleEdit(s)}>✏️Edit</button>
              <button onClick={() => handleDelete(s.id)}>🗑️Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
