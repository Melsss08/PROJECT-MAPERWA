const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

// Import models
const Periode = require('./models/periode');
const Anggota = require('./models/Anggota');

// Import routes
const loginRoutes = require('./routes/login');
const babsRoutes = require('./routes/babs');
const jadwalRoutes = require('./routes/jadwal');
const kontakRoutes = require('./routes/kontak');
const aspirasiRoutes = require('./routes/aspirasi');
const periodeRoutes = require('./routes/Periode');
const anggotaRoutes = require('./routes/Anggota');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Pastikan folder uploads exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Tentukan penyimpanan gambar
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Gunakan rute secara terpisah
app.use('/', loginRoutes);
app.use('/api/babs', babsRoutes); 
app.use('/api/jadwal', jadwalRoutes);
app.use('/babs', babsRoutes);
app.use('/jadwal', jadwalRoutes);
app.use('/kontak', kontakRoutes);
app.use('/api/aspirasi', aspirasiRoutes);
app.use('/periode', periodeRoutes);
app.use('/anggota', anggotaRoutes);
app.use('/struktur', anggotaRoutes); // Tambahkan alias untuk route anggota

// Rute untuk menangani pengiriman data termasuk gambar
app.post('/inputKepengurusan', upload.single('gambar'), async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    console.log('Request File:', req.file);
    
    const { periodeTahun, namaLengkap, jabatan } = req.body;
    
    // Validasi input
    if (!periodeTahun || !namaLengkap || !jabatan) {
      return res.status(400).json({ error: 'Semua field harus diisi' });
    }

    
    // Cari atau buat Periode
    let periode;
    try {
      [periode] = await Periode.findOrCreate({
        where: { tahun: periodeTahun },
        defaults: { tahun: periodeTahun }
      });
    } catch (error) {
      console.error('Error saat mencari/membuat periode:', error);
      return res.status(500).json({ error: 'Gagal mencari/membuat periode' });
    }

    // Dapatkan path gambar relatif (hanya 'uploads/filename.ext')
    const gambarPath = req.file ? `uploads/${req.file.filename}` : null;

    // Simpan data ke database
    try {
      const newAnggota = await Anggota.create({
        namaLengkap: namaLengkap,
        jabatan: jabatan,
        periodeId: periode.id,
        gambar: gambarPath
      });
      
      console.log('Anggota baru berhasil dibuat:', newAnggota);
      res.status(201).json({ 
        success: true, 
        message: 'Data berhasil disimpan',
        data: newAnggota 
      });
    } catch (error) {
      console.error('Error saat membuat anggota:', error);
      res.status(500).json({ error: 'Gagal menambahkan anggota pengurus' });
    }
  } catch (err) {
    console.error('Error umum:', err);
    res.status(500).json({ error: 'Terjadi kesalahan saat menyimpan data' });
  }
});