const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
const PORT = 3001; // backend jalan di port 3001

// Middleware
app.use(cors());
app.use(express.json()); // untuk baca JSON body

// Koneksi database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // ganti sesuai user mysql kamu
  password: '',      // password MySQL kamu (kosongkan jika tidak ada)
  database: 'maperwa',  // nama database yang sudah kita buat tadi
});

// Cek koneksi
db.connect((err) => {
  if (err) {
    console.error('Gagal konek database:', err);
  } else {
    console.log('Koneksi ke database berhasil!');
  }
});

// Route untuk daftar user
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Nama pengguna dan kata sandi wajib diisi' });
  }

  try {
    // Cek apakah username sudah ada
    const [existingUser] = await db.promise().query('SELECT * FROM login WHERE username = ?', [username]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Nama pengguna sudah digunakan!' });
    }

    // Hash password sebelum simpan
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user baru
    await db.promise().query('INSERT INTO login (username, password) VALUES (?, ?)', [username, hashedPassword]);

    res.status(201).json({ message: 'Pendaftaran berhasil!' });
  } catch (error) {
    console.error('Error saat register:', error);
    res.status(500).json({ message: 'Server error!' });
  }
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
