const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Periode = sequelize.define('Periodes', {
  namaPeriode: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true, // Pastikan timestamps diaktifkan jika Anda membutuhkan createdAt dan updatedAt
  tableName: 'periodes', // Nama tabel harus sesuai dengan yang ada di database
});

module.exports = Periode;
