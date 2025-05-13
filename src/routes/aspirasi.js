const express = require('express');
const router = express.Router();
const Aspirasi = require('../models/aspirasi');

// GET semua aspirasi
router.get('/', async (req, res) => {
  try {
    const data = await Aspirasi.findAll({ order: [['createdAt', 'DESC']] });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil aspirasi' });
  }
});

// POST aspirasi baru
router.post('/', async (req, res) => {
  const { nama, isi } = req.body;
  try {
    const newAspirasi = await Aspirasi.create({ nama, isi });
    res.status(201).json(newAspirasi);
  } catch (err) {
    res.status(400).json({ error: 'Gagal mengirim aspirasi' });
  }
});

// DELETE aspirasi
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Aspirasi.destroy({ where: { id: req.params.id } });
    res.json({ success: true, deleted });
  } catch (err) {
    res.status(500).json({ error: 'Gagal menghapus aspirasi' });
  }
});

// PUT balasan ke aspirasi
router.put('/:id/balasan', async (req, res) => {
  const { balasan } = req.body;
  try {
    const update = await Aspirasi.update({ balasan }, { where: { id: req.params.id } });
    res.json({ success: true, update });
  } catch (err) {
    res.status(500).json({ error: 'Gagal menyimpan balasan' });
  }
});



module.exports = router;
