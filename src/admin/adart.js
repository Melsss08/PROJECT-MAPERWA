import React, { useState } from 'react';
import '../css/adart.css';
import InputBab from './InputBab'; // Pastikan path-nya sesuai

const Adart = () => {
  const [showInput, setShowInput] = useState(false);
  const babList = ['BAB I', 'BAB II', 'BAB III', 'BAB IV', 'BAB V', 'BAB VI', 'BAB VII', 'BAB VIII'];

  return (
    <div className="adart-page">
      {!showInput ? (
        <>
          <div className="adart-header">
            <button className="add-button" onClick={() => setShowInput(true)}>+ Tambah Bab</button>
          </div>

          <div className="bab-list">
            {babList.map((bab, index) => (
              <div className="bab-item" key={index}>
                {bab}
              </div>
            ))}
          </div>
        </>
      ) : (
        <InputBab onCancel={() => setShowInput(false)} />
      )}
    </div>
  );
};

export default Adart;
