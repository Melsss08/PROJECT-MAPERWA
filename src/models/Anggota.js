const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Periode = require('./periode');

const Anggota = db.define('Anggota', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  namaLengkap: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jabatan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  periodeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'periode',
      key: 'id',
    }
  },
  gambar: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'anggota',
  timestamps: true,
  // Tambahkan virtual fields untuk konsistensi
  getterMethods: {
    nama: function() {
      return this.namaLengkap;
    },
    gambarUrl: function() {
      return this.gambar ? this.gambar : null;
    }
  }
});

// Definisikan relasi dengan Periode
Anggota.belongsTo(Periode, { foreignKey: 'periodeId' });
Periode.hasMany(Anggota, { foreignKey: 'periodeId' });

module.exports = Anggota;