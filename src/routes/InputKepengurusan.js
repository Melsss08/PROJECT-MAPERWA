// routes/inputkepengurusan.js
const express = require('express');
const multer = require('multer'); 
const Anggota = require('../models/Anggota');
const router = express.Router();

// Set up penyimpanan menggunakan multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Tentukan lokasi folder untuk menyimpan gambar
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);  // Nama file unik dengan timestamp
  }
});

const upload = multer({ storage: storage });

// Endpoint untuk menambah anggota
router.post('/anggota/tambah', upload.single('gambar'), async (req, res) => {
  try {
    const { namaLengkap, jabatan, periodeId } = req.body;

    // Validasi input
    if (!namaLengkap || !jabatan || !periodeId) {
      return res.status(400).json({ error: 'Nama lengkap, jabatan, dan periode ID harus diisi' });
    }

    // Pastikan gambar sudah diupload
    if (!req.file) {
      return res.status(400).json({ error: 'Gambar harus diupload' });
    }

    // Menyimpan data anggota ke database
    const anggota = await Anggota.create({
      namaLengkap,
      jabatan,
      periodeId,
      gambar: req.file.path,  // Simpan path gambar di database
    });

    res.status(201).json(anggota);  // Mengembalikan data anggota yang baru dibuat
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat menambah anggota' });
  }
});

module.exports = router;
