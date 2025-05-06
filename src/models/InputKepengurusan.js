const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // pastikan path-nya sesuai dengan konfigurasi kamu

const InputKepengurusan = sequelize.define('InputKepengurusan', {
  periodeTahun: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  namaLengkap: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jabatan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gambar: {
    type: DataTypes.STRING, // bisa simpan nama file atau URL
    allowNull: true,
  },
}, {
  tableName: 'kepengurusan', // nama tabel di database
  timestamps: true, // aktifkan createdAt dan updatedAt
});

module.exports = InputKepengurusan;
