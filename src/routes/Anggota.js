const express = require('express');

const Anggota = require('../models/Anggota');  // Pastikan model Anggota sudah diimport
const Periode = require('../models/periode');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../config/db');


// Pastikan folder uploads ada
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Konfigurasi storage untuk multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('File harus berupa gambar!'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// =========================== PUT (Update Struktur) ===========================
router.put('/struktur/:id', upload.single('gambar'), async (req, res) => {
  const { nama, jabatan, periodeId } = req.body;
  const { id } = req.params;

  try {
    const pengurus = await Anggota.findByPk(id);

    if (!pengurus) {
      return res.status(404).json({ error: 'Data pengurus tidak ditemukan' });
    }

    // Hapus gambar lama jika ada gambar baru diupload
    if (req.file && pengurus.gambar) {
      const pathGambarLama = path.join(__dirname, '..', pengurus.gambar);
      if (fs.existsSync(pathGambarLama)) {
        fs.unlinkSync(pathGambarLama);
      }
    }

    // Update data pengurus
    await pengurus.update({
      namaLengkap: nama,
      jabatan,
      periodeId,
      gambar: req.file ? `uploads/${req.file.filename}` : pengurus.gambar,
    });

    console.log('req.file:', req.file);
    res.json({ message: 'Data berhasil diperbarui', data: pengurus });
  } catch (err) {
    console.error('Error PUT /struktur/:id:', err);
    res.status(500).json({ error: 'Terjadi kesalahan saat memperbarui data' });
  }
});


// =========================== POST (Tambah Anggota) ===========================
router.post('/', upload.single('gambar'), async (req, res) => {
  try {


    const { nama, jabatan, periodeId } = req.body;

    if (!nama || !jabatan || !periodeId) {
      return res.status(400).json({ error: 'Semua field harus diisi' });
    }

    // ⬇️ Baris ini penting dan HARUS ADA DI SINI
    const gambarPath = req.file ? `uploads/${req.file.filename}` : null;
    const newAnggota = await Anggota.create({
      namaLengkap: nama,
      jabatan,
      periodeId,
      gambar: gambarPath
    });

    res.status(201).json(newAnggota);
  } catch (err) {
    console.error('Error saat menambah Anggota:', err);
    res.status(500).json({ error: 'Gagal menambahkan anggota pengurus' });
  }
});


// =========================== GET (Ambil berdasarkan Periode) ===========================
router.get('/periode/:periodeId', async (req, res) => {
  try {
    const { periodeId } = req.params;
    const data = await Anggota.findAll({
      where: { periodeId },
      order: [['createdAt', 'DESC']]
    });

    const transformedData = data.map(item => ({
      id: item.id,
      nama: item.namaLengkap,
      namaLengkap: item.namaLengkap,
      jabatan: item.jabatan,
      periodeId: item.periodeId,
      gambar: item.gambar,
      gambarUrl: item.gambar,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    }));

    console.log('Data anggota yang dikirim:', transformedData);

    res.json(transformedData);
  } catch (err) {
    console.error('Error saat mengambil data anggota:', err);
    res.status(500).json({ error: 'Gagal mengambil data anggota' });
  }
});

// =========================== DELETE (Hapus Anggota) ===========================
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const anggota = await Anggota.findByPk(id);

    if (!anggota) {
      return res.status(404).json({ error: 'Data pengurus tidak ditemukan' });
    }

    // Hapus file gambar jika ada
    if (anggota.gambar) {
      const fullPath = path.join(__dirname, '..', anggota.gambar);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    await anggota.destroy();
    res.status(200).json({ message: 'Data pengurus berhasil dihapus' });
  } catch (err) {
    console.error('Error saat menghapus data anggota:', err);
    res.status(500).json({ error: 'Gagal menghapus data pengurus' });
  }
});


module.exports = router;
