const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const loginRoutes = require('./routes/login');
const babsRoutes = require('./routes/babs');
const jadwalRoutes = require('./routes/jadwal');
const kontakRoutes = require('./routes/kontak');
const aspirasiRoutes = require('./routes/aspirasi');
const periodeRoutes = require('./routes/Periode');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
// Gunakan rute secara terpisah
app.use('/', loginRoutes);
app.use('/api/babs', babsRoutes); 
app.use('/api/jadwal', jadwalRoutes);
app.use('/babs', babsRoutes);
app.use('/jadwal', jadwalRoutes);
app.use('/kontak', kontakRoutes);
app.use('/api/aspirasi', aspirasiRoutes);
app.use('/periode', periodeRoutes);
app.use('/uploads', express.static('uploads'));
 
sequelize.sync({ force: true })
  .then(() => {
    console.log('Database terkoneksi!');
    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Gagal koneksi DB:', err);
  });
const multer = require('multer');

// Tentukan penyimpanan gambar
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/'); // Tentukan folder penyimpanan gambar
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Menggunakan nama file unik
  }
});

const upload = multer({ storage: storage });

// Rute untuk menangani pengiriman data termasuk gambar
app.post('/inputKepengurusan', upload.single('gambar'), (req, res) => {
  const { periodeTahun, namaLengkap, jabatan } = req.body;
  const gambar = req.file ? req.file.path : null;

  // Simpan data ke database
  // Contoh:
  // Database.insert({ periodeTahun, namaLengkap, jabatan, gambar });

  res.send('Data berhasil disimpan');
});

// Ambil profil admin
app.get('/admin/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM admin WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).send({ message: 'Server error' });
    if (results.length === 0) return res.status(404).send({ message: 'User tidak ditemukan' });
    res.send({ user: results[0] });
  });
});

// Update profil admin
app.put('/admin/:id', (req, res) => {
  const id = req.params.id;
  const { username, passwordBaru } = req.body;
  connection.query(
    'UPDATE admin SET username = ?, password = ? WHERE id = ?',
    [username, passwordBaru, id],
    (err, results) => {
      if (err) return res.status(500).send({ message: 'Server error' });
      res.send({ message: 'Profil berhasil diupdate' });
    }
  );
});

sequelize.authenticate()
  .then(() => console.log('Koneksi DB berhasil.'))
  .catch((err) => console.error('Gagal koneksi DB:', err));

// bagian bawah server.js
module.exports = { upload };
