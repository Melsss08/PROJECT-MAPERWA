const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Bab = sequelize.define('Bab', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  judul: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isi: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false, // Karena kita sudah menggunakan created_at manual
});

module.exports = Bab;
