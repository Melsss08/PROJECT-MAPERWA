const express = require('express');
const { upload } = require('../server'); // Mengimpor upload dari server.js
const Anggota = require('../models/Anggota');  // Pastikan model Anggota sudah diimport
const Periode = require('../models/periode');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Anggota = require('../models/Anggota');

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

// Tambah data anggota baru
router.post('/', upload.single('gambar'), async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    console.log('Request File:', req.file);
    
    const { nama, jabatan, periodeId } = req.body;
    
    // Validasi input
    if (!nama || !jabatan || !periodeId) {
      return res.status(400).json({ error: 'Semua field harus diisi' });
    }

    // Dapatkan path gambar relatif dari folder uploads
    // Simpan hanya 'uploads/filename.ext' alih-alih path lengkap
    const gambarPath = req.file ? 
      `uploads/${req.file.filename}` :
      null;

    // Simpan data ke database
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

// Ambil pengurus berdasarkan periode
router.get('/periode/:periodeId', async (req, res) => {
  try {
    const { periodeId } = req.params;
    const data = await Anggota.findAll({
      where: { periodeId },
      order: [['createdAt', 'DESC']]
    });
    
    // Transform data untuk konsistensi dengan frontend
    const transformedData = data.map(item => ({
      id: item.id,
      nama: item.namaLengkap, // Map namaLengkap ke nama
      namaLengkap: item.namaLengkap,
      jabatan: item.jabatan,
      periodeId: item.periodeId,
      gambar: item.gambar,
      gambarUrl: item.gambar, // Tambahkan gambarUrl
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

// Hapus pengurus
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
