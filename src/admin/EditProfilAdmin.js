import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import '../css/cssAdmin/editProfilAdmin.css';

const EditProfilAdmin = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div className="edit-profil-container">
      <div className="profil-icon">
        <FaUserCircle className="icon" />
        <h3>{username || 'Admin'}</h3>
      </div>

      <form className="edit-profil-form">
        <label>Username</label>
        <input type="text" value={username} readOnly />

        <label>Password Lama</label>
        <input type="password" placeholder="Masukkan Password Lama" />

        <label>Password Baru</label>
        <input type="password" placeholder="Masukkan Password Baru" />

        <label>Ulangi Password</label>
        <input type="password" placeholder="Ulangi Password Baru" />

        <div className="form-buttons">
          <button type="button" className="btn cancel">Batal</button>
          <button type="submit" className="btn save">Selesai</button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilAdmin;
