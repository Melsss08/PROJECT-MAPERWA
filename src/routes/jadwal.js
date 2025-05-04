const express = require('express');
const router = express.Router();
const Jadwal = require('../models/jadwal');

// Tambah jadwal
router.post('/', async (req, res) => {
    console.log('Data masuk:', req.body); // Debug log
  
    const { judul, isiPesan, date } = req.body;
  
    if (!judul || !isiPesan || !date) {
      return res.status(400).json({ error: 'Semua field harus diisi' });
    }
  
    try {
      const jadwal = await Jadwal.create({ judul, isiPesan, date });
      res.json(jadwal);
    } catch (err) {
      console.error('Error saat INSERT:', err);
      res.status(500).json({ error: 'Gagal menambah jadwal' });
    }
  });
  

// Ambil semua jadwal
router.get('/', async (req, res) => {
  try {
    const data = await Jadwal.findAll({ order: [['date', 'ASC']] });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil data' });
  }
});

module.exports = router;
