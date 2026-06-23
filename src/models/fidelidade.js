const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Fidelidade = sequelize.define('Fidelidade', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'usuarios',
      key: 'id_usuario'
    },
    onDelete: 'CASCADE'
  },
  pontos: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'fidelidade',
  timestamps: false
});

module.exports = Fidelidade;
