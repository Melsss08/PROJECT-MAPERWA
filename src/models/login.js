// LOGIN.js ITU DAFTAR AKUN

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isLoggedIn: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // awalnya tidak login
  },
});

module.exports = User;
