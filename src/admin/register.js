import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // <-- import ini
import '../css/register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // <-- inisialisasi useNavigate

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('http://localhost:3001/register', { 
        username,
        password,
        confirmPassword,
      });

      setMessage(response.data.message);
      setUsername('');
      setPassword('');
      setConfirmPassword('');

      // Redirect ke halaman login setelah sukses
      if(response.data.success || response.status === 200) {
        // contoh redirect ke route "/login"
        navigate('/masuk'); 
      }
      
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Terjadi kesalahan saat mendaftar.');
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Buat Akun</h2>
      <form onSubmit={handleRegister}>
        <div className="input-group">
          <label>Nama Pengguna:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Kata Sandi:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Konfirmasi Kata Sandi:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Daftar</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Register;
