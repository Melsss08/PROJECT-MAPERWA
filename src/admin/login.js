import React, { useState } from 'react';
import axios from 'axios'; // pastikan install axios: npm install axios


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [konfirPassword, setKonfirPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!username || !password || !konfirPassword) {
      setError('Semua kolom harus diisi!');
      return;
    }
  
    if (password !== konfirPassword) {
      setError('Kata sandi dan konfirmasi tidak cocok!');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3001/register', {
        username,
        password,
      });
  
      alert(response.data.message); // tampilkan pesan sukses
      window.location.href = '/beranda'; // redirect kalau mau
    } catch (error) {
      setError(error.response?.data?.message || 'Gagal daftar');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={{ marginBottom: '20px' }}>Daftar Akun</h2>

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.field}>
          <label style={styles.label}>Nama Pengguna:</label>
          <input
            type="text"
            placeholder="Masukkan nama pengguna"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Kata Sandi:</label>
          <input
            type="password"
            placeholder="Masukkan kata sandi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Konfirmasi Kata Sandi:</label>
          <input
            type="password"
            placeholder="Ulangi kata sandi"
            value={konfirPassword}
            onChange={(e) => setKonfirPassword(e.target.value)}
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button}>Daftar</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#f0f2f5',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  form: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
    width: '320px',
    textAlign: 'left',
  },
  field: {
    marginBottom: '16px',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '6px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '90%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '14px',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  error: {
    backgroundColor: '#ffe5e5',
    color: '#d00000',
    padding: '10px',
    borderRadius: '6px',
    marginBottom: '16px',
    fontSize: '14px',
    textAlign: 'center',
  },
};

export default Login;
