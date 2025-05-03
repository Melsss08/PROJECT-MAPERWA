const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const loginRoutes = require('./routes/login');
const masukRoutes = require('./routes/masuk');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Gunakan rute secara terpisah
app.use('/masuk', masukRoutes);
app.use('/login', loginRoutes);

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
