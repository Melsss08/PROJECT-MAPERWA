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
  subJudul: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pasal: {
    type: DataTypes.STRING,
    allowNull: true,
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
  timestamps: false,
});

module.exports = Bab;
