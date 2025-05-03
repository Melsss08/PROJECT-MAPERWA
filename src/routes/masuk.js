const express = require('express');
const router = express.Router();
const User = require('../models/masuk');

router.post('/masuk', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username dan password wajib diisi' });
  }

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(400).json({ message: 'User tidak ditemukan' });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: 'Password salah' });
    }

    res.json({ message: 'Masuk berhasil!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
});

module.exports = router;
