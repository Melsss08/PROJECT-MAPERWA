const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Jadwal = sequelize.define('Jadwal', {
  judul: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isiPesan: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  }
});

module.exports = Jadwal;
