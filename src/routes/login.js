// LOGIN ITU DAFTAR AKUN

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
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

    // Hash password sebelum disimpan
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({ username, password: hashedPassword });

    res.json({ message: 'Pendaftaran berhasil!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username dan password wajib diisi' });
  }

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(400).json({ message: 'User tidak ditemukan' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Password salah' });
    }

    // Tandai semua user sebagai tidak login
    // await User.update({ isLoggedIn: false }, { where: {} });

    // Tandai user ini sebagai sedang login
    await user.update({ isLoggedIn: true });

    res.json({
      message: 'Login berhasil!',
      user: {
        id: user.id,
        username: user.username
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
});


router.post('/updatePassword', async (req, res) => {
  const { userId, oldPassword, newPassword, confirmNewPassword } = req.body;

  if (!userId || !oldPassword || !newPassword || !confirmNewPassword) {
    return res.status(400).json({ message: 'Semua kolom wajib diisi' });
  }

  if (newPassword !== confirmNewPassword) {
    return res.status(400).json({ message: 'Konfirmasi password tidak cocok' });
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Password lama salah' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    await user.update({ password: hashedNewPassword });

    res.json({ message: 'Password berhasil diperbarui' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
});


module.exports = router;