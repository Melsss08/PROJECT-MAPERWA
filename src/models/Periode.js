// models/periode.js
const { DataTypes } = require('sequelize');
const db = require('../config/db');
const { upload } = require('../server');

const Periode = db.define('Periode', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  tahun: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  }
}, {
  tableName: 'periode', // nama tabel di database
  timestamps: true      // jika ingin mencatat createdAt & updatedAt
});

module.exports = Periode;
