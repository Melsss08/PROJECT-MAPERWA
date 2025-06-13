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
// const Admin = require('./models/admin'); // Pastikan kamu punya models/admin.js

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
app.use(anggotaRoutes); 
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
app.use('/uploads', express.static(uploadsDir));

// Konfigurasi Multer untuk unggah gambar
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });


// Gunakan rute secara modular
app.use('/', loginRoutes);
app.use('/api/babs', babsRoutes);
app.use('/api/jadwal', jadwalRoutes);
app.use('/babs', babsRoutes);
app.use('/jadwal', jadwalRoutes);
app.use('/kontak', kontakRoutes);
app.use('/api/aspirasi', aspirasiRoutes);
app.use('/periode', periodeRoutes);
app.use('/kelolaBeranda', kelolaBerandaRoutes);


// Rute untuk input kepengurusan
app.post('/inputKepengurusan', upload.single('gambar'), async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    console.log('Request File:', req.file);


// Rute untuk menangani pengiriman data termasuk gambar
// Rute: Input Kepengurusan dengan gambar
app.post('/inputKepengurusan', upload.single('gambar'), async (req, res) => {
  try {

    const { periodeTahun, namaLengkap, jabatan } = req.body;
    const gambarPath = req.file ? `uploads/${req.file.filename}` : null;

    if (!periodeTahun || !namaLengkap || !jabatan) {
      return res.status(400).json({ error: 'Semua field harus diisi' });
    }


    // Cari atau buat periode


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

    const gambarPath = req.file ? `uploads/${req.file.filename}` : null;

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


    const [periode] = await Periode.findOrCreate({
      where: { tahun: periodeTahun },
      defaults: { tahun: periodeTahun }
    });

    // Gunakan periode.id, BUKAN periodeTahun
    await Anggota.create({

      namaLengkap,
      jabatan,
      periodeId: periode.id,
      gambar: gambarPath
    });

    res.send('Data berhasil disimpan');
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});



// Koneksi ke database dan menjalankan server

sequelize.sync({ force: true })
sequelize.sync()
// Rute: Ambil profil admin
app.get('/admin/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await Admin.findByPk(id);
    if (!admin) return res.status(404).send({ message: 'User tidak ditemukan' });
    res.send({ user: admin });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

// Rute: Update profil admin
app.put('/admin/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { username, passwordBaru } = req.body;

    const [updated] = await Admin.update(
      { username, password: passwordBaru },
      { where: { id } }
    );

    if (updated === 0) return res.status(404).send({ message: 'User tidak ditemukan' });

    res.send({ message: 'Profil berhasil diupdate' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

// Sync DB dan jalankan server
sequelize.sync() // Ganti ke `true` hanya jika ingin reset semua tabel

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
