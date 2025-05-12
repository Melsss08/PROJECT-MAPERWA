const express = require('express');
const router = express.Router();
const Kontak = require('../models/kontak');

// Tambah atau replace satu-satunya kontak
router.post('/', async (req, res) => {
  try {
    await Kontak.destroy({ where: {} }); // Hapus semua dulu
    const newContact = await Kontak.create(req.body); // Tambah baru
    res.status(200).send(newContact);
  } catch (err) {
    res.status(400).send({ message: 'Gagal menambahkan kontak', error: err.message });
  }
});

// Ambil kontak (selalu dalam array agar bisa .map)
router.get('/', async (req, res) => {
  try {
    const contact = await Kontak.findOne();
    if (contact) {
      res.status(200).send([contact]); // penting: dikembalikan sebagai array
    } else {
      res.status(200).send([]);
    }
  } catch (err) {
    res.status(500).send({ message: 'Gagal mengambil kontak', error: err.message });
  }
});

// Update kontak berdasarkan id
router.put('/:id', async (req, res) => {
  try {
    const updated = await Kontak.update(req.body, { where: { id: req.params.id } });
    res.status(200).send({ message: 'Kontak diperbarui', updated });
  } catch (err) {
    res.status(400).send({ message: 'Gagal memperbarui kontak', error: err.message });
  }
});

// Hapus kontak berdasarkan id
router.delete('/:id', async (req, res) => {
  try {
    await Kontak.destroy({ where: { id: req.params.id } });
    res.status(200).send({ message: 'Kontak dihapus' });
  } catch (err) {
    res.status(400).send({ message: 'Gagal menghapus kontak', error: err.message });
  }
});

module.exports = router;
