const express = require('express');
const cors = require('cors'); // Tambahkan ini untuk CORS
const router = express.Router();
const Bab = require('../models/babs');

// CORS middleware
const app = express();
app.use(cors()); // Ini untuk mengizinkan request dari domain berbeda

// POST untuk menambah bab
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

// GET berdasarkan id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const bab = await Bab.findByPk(id);
    if (!bab) {
      return res.status(404).json({ error: 'Bab tidak ditemukan' });
    }
    res.json(bab);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil data bab' });
  }
});

// PUT untuk update bab
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { judul, subJudul, pasal, isi } = req.body;

  try {
    const bab = await Bab.findByPk(id);
    if (!bab) {
      return res.status(404).json({ error: 'Bab tidak ditemukan' });
    }

    await bab.update({ judul, subJudul, pasal, isi });
    res.json({ message: 'Bab berhasil diperbarui', bab });
  } catch (err) {
    console.error('Gagal mengupdate bab:', err);
    res.status(500).json({ error: 'Gagal mengupdate bab' });
  }
});

// DELETE untuk hapus bab
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const bab = await Bab.findByPk(id);
    if (!bab) {
      return res.status(404).json({ error: 'Bab tidak ditemukan' });
    }

    await bab.destroy();
    res.json({ message: 'Bab berhasil dihapus' });
  } catch (err) {
    console.error('Gagal menghapus bab:', err);
    res.status(500).json({ error: 'Gagal menghapus bab' });
  }
});

module.exports = router;
