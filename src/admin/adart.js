import React, { useState, useEffect } from 'react';
import '../css/adart.css';
import InputBab from './InputBab';
import DetailBabPasal from './DetailBabPasal';
import axios from 'axios';

const Adart = () => {
  const [showInput, setShowInput] = useState(false);
  const [selectedBab, setSelectedBab] = useState(null);
  const [babList, setBabList] = useState([]); // state buat list bab dari DB

  // Ambil data dari API pas komponen mount
  useEffect(() => {
    fetchBabList();
  }, []);

  // Function ambil data bab
  const fetchBabList = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/babs');
      setBabList(response.data);
    } catch (error) {
      console.error('Gagal mengambil data bab:', error);
    }
  };

  // Saat klik judul bab
  const handleBabClick = (bab) => {
    setSelectedBab(bab);
  };

  // Saat klik kembali dari detail bab
  const handleBack = () => {
    setSelectedBab(null);
  };

  return (
    <div className="adart-page">
      {!showInput && !selectedBab && (
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
                {bab.judul}
              </div>
            ))}
          </div>
        </>
      )}

      {showInput && !selectedBab && (
        <InputBab
          onCancel={() => {
            setShowInput(false);
            fetchBabList(); // refresh data setelah tambah
          }}
          onBabAdded={fetchBabList} // Pass fetchBabList as a prop to refresh the list
        />
      )}

      {selectedBab && (
        <DetailBabPasal bab={selectedBab} onBack={handleBack} />
      )}
    </div>
  );
};

export default Adart;
