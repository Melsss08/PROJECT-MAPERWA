import React, { useState } from 'react';
import '../css/cssAdmin/inputBab.css';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const InputBab = ({ onCancel, onBabAdded }) => {
  const [judul, setJudul] = useState('');
  const [subJudul, setSubJudul] = useState('');
  const [pasal, setPasal] = useState('');
  const [isi, setIsi] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!judul || !isi) {
      alert("Judul dan isi harus diisi");
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/babs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ judul, subJudul, pasal, isi }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Bab berhasil ditambahkan!");
        setJudul('');
        setSubJudul('');
        setPasal('');
        setIsi('');
        onBabAdded();

        // Navigasi ke halaman Adart setelah berhasil menambah bab
        navigate('/adart'); // Redirect ke halaman Adart
      } else {
        alert(`Gagal menambah bab: ${data.error}`);
      }
    } catch (err) {
      console.error('Error:', err);
      alert("Terjadi kesalahan saat menghubungi server.");
    }
  };

  return (
    <div className="input-bab-container">
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <FaPlus className="icon" />
          <input
            type="text"
            placeholder="Masukkan Nama Bab"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
          />
        </div>

        <div className="input-field">
          <FaPlus className="icon" />
          <input
            type="text"
            placeholder="Masukkan Sub Judul (opsional)"
            value={subJudul}
            onChange={(e) => setSubJudul(e.target.value)}
          />
        </div>

        <div className="input-field">
          <FaPlus className="icon" />
          <input
            type="text"
            placeholder="Masukkan Pasal (opsional)"
            value={pasal}
            onChange={(e) => setPasal(e.target.value)}
          />
        </div>

        <div className="input-area">
          <FaPlus className="icon" />
          <textarea
            placeholder="Masukkan Isi Bab"
            value={isi}
            onChange={(e) => setIsi(e.target.value)}
          />
        </div>
        <div className="button-group">
          <button type="button" className="btn cancel" onClick={onCancel}>
            Batal
          </button>
          <button type="submit" className="btn submit">
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};
export default InputBab;
