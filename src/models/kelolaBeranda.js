const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const KelolaBeranda = sequelize.define('KelolaBeranda', {
  judul: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  visi: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  misi: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'KelolaBeranda',
  timestamps: true
});

module.exports = KelolaBeranda;
