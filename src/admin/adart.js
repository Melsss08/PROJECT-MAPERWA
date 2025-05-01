import React from 'react';
import '../css/adart.css'; // CSS khusus halaman ini

const Adart = () => {
  const babList = ['BAB I', 'BAB II', 'BAB III', 'BAB IV', 'BAB V', 'BAB VI', 'BAB VII', 'BAB VIII'];

  return (
    <div className="adart-page">
      <div className="adart-header">
        {/* <h2>Kelola AD/ART</h2> */}
        <button className="add-button">+ Tambah Bab</button>
      </div>

      <div className="bab-list">
        {babList.map((bab, index) => (
          <div className="bab-item" key={index}>
            {bab}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Adart;
