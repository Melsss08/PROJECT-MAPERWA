import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/kontak.css';

export default function ContactForm() {
  const [kontak, setKontak] = useState([]);
  const [form, setForm] = useState({
    nomor: '',
    email: '',
    instagram: '',
    facebook: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:3001/kontak');
      setKontak(res.data);
    } catch (error) {
      console.error('Error fetching kontak:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://localhost:3001/kontak/${editId}`, form);
        setEditMode(false);
        setEditId(null);
      } else {
        await axios.post('http://localhost:3001/kontak', form);
      }

      setForm({ nomor: '', email: '', instagram: '', facebook: '' });
      fetchData();
    } catch (error) {
      console.error('Gagal menambahkan kontak:', error);
    }
  };

  const handleEdit = (contact) => {
    setEditMode(true);
    setEditId(contact.id);
    setForm({
      nomor: contact.nomor,
      email: contact.email,
      instagram: contact.instagram,
      facebook: contact.facebook
    });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/kontak/${id}`);
    fetchData();
  };

  return (
    <div className="container">
      {(kontak.length === 0 || editMode) && (
        <form onSubmit={handleSubmit} className="kontak-form">
        <div className="form-group">
          <label>Nomor Telepon:</label>
          <input
            type="text"
            placeholder="Masukkan Nomor Telepon"
            value={form.nomor}
            onChange={(e) => setForm({ ...form, nomor: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Masukkan Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Instagram:</label>
          <input
            type="text"
            placeholder="Masukkan Instagram"
            value={form.instagram}
            onChange={(e) => setForm({ ...form, instagram: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Facebook:</label>
          <input
            type="text"
            placeholder="Masukkan Facebook"
            value={form.facebook}
            onChange={(e) => setForm({ ...form, facebook: e.target.value })}
          />
        </div>
        <button type="submit" className="submit-button">{editMode ? 'Simpan Perubahan' : 'Tambah Kontak'}</button>
      </form>
      )}


      <div className="contact-list">
        {kontak.map((contact) => (
          <div className="card" key={contact.id}>
            <p><strong>Nomor:</strong> {contact.nomor}</p>
            <p><strong>Email:</strong> {contact.email}</p>
            <p><strong>Instagram:</strong> {contact.instagram}</p>
            <p><strong>Facebook:</strong> {contact.facebook}</p>
            <div className="card-actions">
              <button onClick={() => handleEdit(contact)}>✏️ Edit</button>
              <button onClick={() => handleDelete(contact.id)}>🗑️ Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
