// LOGIN ITU DAFTAR AKUN

const express = require('express');
const router = express.Router();
const User = require('../models/login');

router.post('/register', async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (!username || !password || !confirmPassword) {
    return res.status(400).json({ message: 'Semua kolom wajib diisi' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Konfirmasi password tidak cocok' });
  }

  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username sudah terdaftar' });
    }

    await User.create({ username, password }); // Simpan hanya password

    res.json({ message: 'Pendaftaran berhasil!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
});

module.exports = router;
