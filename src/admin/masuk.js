import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // import useNavigate
import '../css/register.css'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();  // inisialisasi navigate

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('http://localhost:3001/login', {
        username,
        password,
      });
      setMessage(response.data.message);

      // Simpan data login ke localStorage
      localStorage.setItem('userId', response.data.user.id);
      localStorage.setItem('username', response.data.user.username);

      // Redirect ke halaman beranda setelah login sukses
      navigate('/admin/adart');  // sesuaikan path halaman beranda sesuai router kamu

    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Terjadi kesalahan saat login.');
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Masuk</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Masuk</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Login;