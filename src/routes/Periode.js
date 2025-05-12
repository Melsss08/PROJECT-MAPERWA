const express = require('express');
const { upload } = require('../server');  // Mengimpor upload dari server.js yang sudah diekspor
const Periode = require('../models/Periode');
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const periodes = await Periode.findAll();  // Pastikan Periode.findAll() berfungsi dengan baik
    res.status(200).json(periodes);
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ error: 'Gagal mengambil data periode' });
  }
});


// routes/periode.js
// Menambah periode
router.post('/tambah', async (req, res) => {
  try {
    const { namaPeriode } = req.body;
    if (!namaPeriode) {
      return res.status(400).json({ error: 'Nama periode tidak boleh kosong' });
    }
    const periode = await Periode.create({ namaPeriode });
    res.status(201).json(periode);  // Mengembalikan periode yang baru dibuat
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server saat menambah periode' });
  }
});



// Update periode dengan upload gambar
router.put('/:id', upload.single('gambar'), async (req, res) => {  // Gunakan upload.single('gambar') dengan benar
  try {
    const { id } = req.params;
    const { namaPeriode } = req.body;

    if (!namaPeriode) {
      return res.status(400).json({ error: 'Nama periode tidak boleh kosong' });
    }

    const periode = await Periode.findByPk(id);
    if (!periode) {
      return res.status(404).json({ error: 'Periode tidak ditemukan' });
    }

    periode.namaPeriode = namaPeriode;

    if (req.file) {
      periode.gambar = req.file.path;  // Menyimpan path gambar yang diupload
    }

    await periode.save();
    res.status(200).json(periode);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat memperbarui periode' });
  }
});

// Rute lainnya tetap seperti sebelumnya
module.exports = router;

