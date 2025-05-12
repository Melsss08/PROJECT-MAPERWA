import React, { useState, useEffect } from 'react';
import '../css/cssAdmin/adart.css';
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
              <div className="bab-item" key={bab.id} onClick={() => handleBabClick(bab)}>
                {bab.judul}
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
