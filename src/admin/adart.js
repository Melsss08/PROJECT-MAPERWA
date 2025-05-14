import React, { useState, useEffect } from 'react';
import '../css/adart.css';
import InputBab from './InputBab';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Adart = () => {
  const [showInput, setShowInput] = useState(false);
  const [babList, setBabList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBabList();
  }, []);

  const fetchBabList = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/babs');
      setBabList(response.data);
    } catch (error) {
      console.error('Gagal mengambil data bab:', error);
    }
  };

  const handleBabClick = (bab) => {
    navigate(`/detail-bab/${bab.id}`);
  };

  const handleDeleteBab = async (e, babId) => {
    e.stopPropagation(); // Mencegah klik hapus membuka detail bab
    if (window.confirm('Yakin ingin menghapus bab ini?')) {
      try {
        // Kirim permintaan DELETE ke server
        await axios.delete(`http://localhost:3001/api/babs/${babId}`);
        // Setelah berhasil menghapus, ambil daftar bab yang terbaru
        fetchBabList();
      } catch (error) {
        console.error('Gagal menghapus bab:', error);
      }
    }
  };

  return (
    <div className="adart-page">
      {!showInput && (
        <>
          <div className="adart-header">
            <button className="add-button" onClick={() => setShowInput(true)}>
              + Tambah Bab
            </button>
          </div>

          <div className="bab-list">
            {babList.map((bab) => (
              <div
                className="bab-item"
                key={bab.id}
                onClick={() => handleBabClick(bab)}
              >
                <span>{bab.judul}</span>
                <span
                  className="delete-icon"
                  onClick={(e) => handleDeleteBab(e, bab.id)}
                  title="Hapus bab"
                >
                  <i className="fas fa-trash"></i>
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      {showInput && (
        <InputBab
          onCancel={() => {
            setShowInput(false);
            fetchBabList();
          }}
          onBabAdded={fetchBabList}
        />
      )}
    </div>
  );
};

export default Adart;
