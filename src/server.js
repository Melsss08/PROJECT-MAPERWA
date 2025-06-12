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
const kelolaBerandaRoutes = require('./routes/kelolaBeranda');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/struktur', anggotaRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



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
    cb(null, 'uploads/'); // Tentukan folder penyimpanan gambar
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Menggunakan nama file unik
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
app.use('/kelolaBeranda', kelolaBerandaRoutes);
app.use('/uploads', express.static('uploads'));


// Rute untuk menangani pengiriman data termasuk gambar
app.post('/inputKepengurusan', upload.single('gambar'), async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    console.log('Request File:', req.file);

    // Validasi input
    const { periodeTahun, namaLengkap, jabatan } = req.body;
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
    // Contoh simpan data ke tabel Anggota:
    try {
      await Anggota.create({
        periodeTahun,
        namaLengkap,
        jabatan,
        gambar: gambarPath
      });
      res.send('Data berhasil disimpan');
    } catch (error) {
      console.error('Error saat menyimpan data anggota:', error);
      res.status(500).json({ error: 'Gagal menyimpan data anggota' });
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});

// Koneksi ke database dan menjalankan server
sequelize.sync()
  .then(() => {
    console.log('Database terkoneksi!');
    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Gagal koneksi DB:', err);
  });

sequelize.authenticate()
  .then(() => console.log('Koneksi DB berhasil.'))
  .catch((err) => console.error('Gagal koneksi DB:', err));

