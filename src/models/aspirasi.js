const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Aspirasi = sequelize.define('Aspirasi', {
  nama: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isi: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  balasan: {
    type: DataTypes.TEXT,
    allowNull: true
  },
});

module.exports = Aspirasi;
