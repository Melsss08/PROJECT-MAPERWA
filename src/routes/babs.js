const express = require('express');
const Bab = require('../models/babs'); // Import model Bab

const router = express.Router();

router.post('/', async (req, res) => {
  const { judul, isi } = req.body;

  if (!judul || !isi) {
    return res.status(400).json({ error: 'Judul dan isi harus diisi' });
  }

  try {
    const bab = await Bab.create({ judul, isi });
    res.status(201).json(bab);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal menambah bab', message: err.message });
  }
});


// Ambil semua bab
router.get('/', async (req, res) => {
  try {
    const babs = await Bab.findAll();
    res.status(200).json(babs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal mengambil data bab' });
  }
});

module.exports = router;
