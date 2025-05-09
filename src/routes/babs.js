const express = require('express');
const router = express.Router();
const Bab = require('../models/babs');

// POST buat tambah bab
router.post('/', async (req, res) => {
  try {
    const { judul, subJudul, pasal, isi } = req.body;
    console.log('Request diterima:', req.body);

    const newBab = await Bab.create({ judul, subJudul, pasal, isi });
    res.status(201).json(newBab);
  } catch (err) {
    console.error('Gagal menambah bab:', err);
    res.status(500).json({ error: 'Gagal menambah bab' });
  }
});

// GET semua bab
router.get('/', async (req, res) => {
  try {
    const babs = await Bab.findAll();
    res.json(babs);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil data bab' });
  }
});

module.exports = router;
