const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Kontak = sequelize.define('Kontak', {
  nomor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  instagram: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  facebook: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Kontak;
