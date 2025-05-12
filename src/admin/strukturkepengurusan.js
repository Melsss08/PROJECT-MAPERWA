import React, { useState } from 'react';
import '../css/strukturkepengurusan.css';
import InputKepengurusan from './InputKepengurusan'; // Pastikan path-nya sesuai

const StrukturKepengurusan = () => {
  const [showInput, setShowInput] = useState(false);
  const KepengurusanList = ['Periode Tahun 2025-2026', 'Periode Tahun 2025-2024', 'Periode Tahun 2024-2023', 'Periode Tahun 2023-2022'];

  return (
    <div className="strukturkepengurusan-page">
      {!showInput ? (
        <>
          <div className="strukturkepengurusan-header">
            <button className="add-button" onClick={() => setShowInput(true)}>+ Tambah Periode dan Pengurus</button>
          </div>

          <div className="kepengurusan-list">
            {KepengurusanList.map((Kepengurusan, index) => (
              <div className="kepengurusan-item" key={index}>
                {Kepengurusan}
              </div>
            ))}
          </div>
        </>
      ) : (
        <InputKepengurusan onCancel={() => setShowInput(false)} />
      )}
    </div>
  );
};

export default StrukturKepengurusan;
