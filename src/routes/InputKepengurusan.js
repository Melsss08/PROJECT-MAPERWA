const express = require('express');
const router = express.Router();

// Konfigurasi Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // simpan ke folder uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // beri nama unik
  },
});

const upload = multer({ storage });

// CREATE: Tambah data kepengurusan dengan gambar
router.post('/', upload.single('gambar'), async (req, res) => {
  try {
    const { periodeTahun, namaLengkap, jabatan } = req.body;
    const gambar = req.file ? req.file.filename : null;

    const newData = await InputKepengurusan.create({
      periodeTahun,
      namaLengkap,
      jabatan,
      gambar,
    });
    res.status(201).json(newData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
