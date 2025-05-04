const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const loginRoutes = require('./routes/login');
const jadwalRoutes = require('./routes/jadwal');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/', loginRoutes);
app.use('/jadwal', jadwalRoutes);

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
