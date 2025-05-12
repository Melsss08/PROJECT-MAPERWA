const express = require('express');
const { upload } = require('../server'); // Mengimpor upload dari server.js
const Anggota = require('../models/Anggota');  // Pastikan model Anggota sudah diimport
const Periode = require('../models/Periode');
const router = express.Router();

// Update anggota, dengan upload gambar
router.put('/:id', upload.single('gambar'), async (req, res) => {  // Gunakan upload.single('gambar')
  try {
    const { id } = req.params;
    const { namaLengkap, jabatan, periodeId } = req.body;

    if (!namaLengkap || !jabatan || !periodeId) {
      return res.status(400).json({ error: 'Nama lengkap, jabatan, dan periode ID harus diisi' });
    }

    const anggota = await Anggota.findByPk(id);
    if (!anggota) {
      return res.status(404).json({ error: 'Anggota tidak ditemukan' });
    }

    anggota.namaLengkap = namaLengkap;
    anggota.jabatan = jabatan;
    anggota.periodeId = periodeId;

    if (req.file) {
      anggota.gambar = req.file.path;
    }

    await anggota.save();
    res.status(200).json(anggota);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat memperbarui anggota' });
  }
});

// Hapus anggota
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const anggota = await Anggota.findByPk(id);

    if (!anggota) {
      return res.status(404).json({ error: 'Anggota tidak ditemukan' });
    }

    await anggota.destroy();
    res.status(200).json({ message: 'Anggota berhasil dihapus' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat menghapus anggota' });
  }
});

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

// Mengambil semua periode
router.get('/', async (req, res) => {
  try {
    const periodes = await Periode.findAll();
    res.status(200).json(periodes);
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ error: 'Gagal mengambil data periode' });
  }
});

module.exports = router;
