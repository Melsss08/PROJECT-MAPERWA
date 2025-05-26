const express = require('express');
const router = express.Router();
const KelolaBeranda = require('../models/kelolaBeranda');

// GET data terakhir beranda
router.get('/', async (req, res) => {
  try {
    const data = await KelolaBeranda.findOne({ order: [['createdAt', 'DESC']] });
    res.json(data || {});
  } catch (err) {
    console.error('ERROR AMBIL DATA BERANDA:', err);
    res.status(500).json({ error: 'Gagal mengambil data beranda' });
  }
});

// POST data baru beranda
router.post('/', async (req, res) => {
  const { visi, misi } = req.body;
  try {
    const newData = await KelolaBeranda.create({ visi, misi });
    res.status(201).json(newData);
  } catch (err) {
    res.status(400).json({ error: 'Gagal menyimpan data beranda' });
  }
});

// DELETE (jika dibutuhkan nanti)
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await KelolaBeranda.destroy({ where: { id: req.params.id } });
    res.json({ success: true, deleted });
  } catch (err) {
    res.status(500).json({ error: 'Gagal menghapus data beranda' });
  }
});

module.exports = router;
