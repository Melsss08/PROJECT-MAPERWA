const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const path = require('path'); // Pastikan untuk mengimport path

// Rute yang diimpor
const loginRoutes = require('./routes/login');
const babsRoutes = require('./routes/babs');
const jadwalRoutes = require('./routes/jadwal');
const inputKepengurusanRoutes = require('./routes/InputKepengurusan');
// const masukRoutes = require('./routes/masuk');
// const periodeRoutes = require('./routes/periode');

const app = express();
const PORT = 3001;

// Set up penyimpanan untuk gambar menggunakan multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, 'uploads'); // Menentukan folder penyimpanan gambar
    cb(null, uploadPath); // Simpan file ke folder uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Gunakan nama file unik dengan timestamp
  }
});

// Setelah mendefinisikan storage, baru kita inisialisasi upload
const upload = multer({ storage: storage });

// Ekspor upload untuk digunakan di file lain (jika diperlukan)
module.exports = { upload };

// Middleware untuk parsing JSON request body
app.use(cors());
app.use(bodyParser.json());

// Gunakan rute secara terpisah
app.use('/', loginRoutes);

app.use('/babs', babsRoutes);
app.use('/inputKepengurusan', inputKepengurusanRoutes);
app.use('/uploads', express.static('uploads'));
// app.use('/periode', periodeRoutes);

// Sinkronisasi dengan database
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

