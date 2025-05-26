// routes/periode.js
const express = require('express');
const router = express.Router();
const Periode = require('../models/Periode');

// Tambah Periode
router.post('/', async (req, res) => {
  try {
    const { tahun } = req.body;

    if (!tahun || tahun.trim() === '') {
      return res.status(400).json({ error: 'Tahun tidak boleh kosong.' });
    }

    const existing = await Periode.findOne({ where: { tahun } });
    if (existing) {
      return res.status(409).json({ error: 'Periode dengan tahun ini sudah ada.' });
    }

    const newPeriode = await Periode.create({ tahun });
    res.status(201).json(newPeriode);
  } catch (err) {
    console.error('Error saat menambah periode:', err);
    res.status(500).json({ error: 'Gagal menambahkan periode.' });
  }
});

// Ambil semua Periode
router.get('/', async (req, res) => {
  try {
    const data = await Periode.findAll({
      order: [['createdAt', 'DESC']] // agar yang terbaru muncul di atas
    });
    res.json(data);
  } catch (err) {
    console.error('Error saat mengambil data periode:', err);
    res.status(500).json({ error: 'Gagal mengambil data periode.' });
  }
});

module.exports = router;