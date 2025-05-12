const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Periode = require('./Periode'); // Import Periode model

const Anggota = sequelize.define('Anggota', {
  namaLengkap: {
    type: DataTypes.STRING,
    allowNull: false
  },
  jabatan: {
    type: DataTypes.STRING,
    allowNull: false
  },
  periodeId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Periodes', // Name of the Periode model in plural form
      key: 'id'
    }
  },
  gambar: {  // Menyimpan path gambar
    type: DataTypes.STRING,
    allowNull: true,
}, 
  timestamps: false // Disable timestamps if you do not need createdAt or updatedAt
});

Anggota.belongsTo(Periode, { foreignKey: 'periodeId' });  // Establish relationship

module.exports = Anggota;