import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/cssUser/pengumuman.css';

const PengumumanUser = () => {
  const [pengumumanData, setPengumumanData] = useState([]);

  useEffect(() => {
    fetchPengumuman();
  }, []);

  const fetchPengumuman = async () => {
    try {
      const response = await axios.get('http://localhost:3001/jadwal'); // pastikan port sesuai backend
      console.log('Data pengumuman:', response.data);
      setPengumumanData(response.data);
    } catch (error) {
      console.error('Gagal mengambil data pengumuman:', error);
    }
  };

  return (
    <div className="pengumuman-container">
      <h2>PENGUMUMAN</h2>
      {pengumumanData.length === 0 ? (
        <p>Loading atau tidak ada pengumuman.</p>
      ) : (
        pengumumanData.map((item) => (
          <div className="pengumuman-card" key={item.id}>
            <div className="pengumuman-header">
              <strong>{item.judul}</strong>
              <span className="pengumuman-date">
                {new Date(item.date).toLocaleDateString('id-ID')}
              </span>
            </div>
            <p>{item.isiPesan}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default PengumumanUser;
