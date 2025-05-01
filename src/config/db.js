// DB.JS ITU DATABASENYA LOGIN(DAFTAR AKUN)

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('maperwa', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
