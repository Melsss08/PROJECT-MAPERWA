const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const loginRoutes = require('./routes/login');
const babsRoutes = require('./routes/babs');
const jadwalRoutes = require('./routes/jadwal');
const inputKepengurusanRoutes = require('./routes/InputKepengurusan');
const kontakRoutes = require('./routes/kontak');
const aspirasiRoutes = require('./routes/aspirasi');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Gunakan rute secara terpisah
app.use('/', loginRoutes);
app.use('/api/babs', babsRoutes); 
app.use('/api/jadwal', jadwalRoutes);
app.use('/babs', babsRoutes);
app.use('/inputKepengurusan', inputKepengurusanRoutes);
app.use('/jadwal', jadwalRoutes);
app.use('/kontak', kontakRoutes);
app.use('/aspirasi', aspirasiRoutes);
app.use('/uploads', express.static('uploads'));

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
