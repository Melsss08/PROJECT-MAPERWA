const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const KelolaBeranda = sequelize.define('KelolaBeranda', {
  visi: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  misi: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}
);

module.exports = KelolaBeranda;
