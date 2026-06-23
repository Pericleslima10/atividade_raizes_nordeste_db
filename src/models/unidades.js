const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Unidades = sequelize.define('Unidades', {
  id_unidade: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  endereco: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  cidade: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  estado: {
    type: DataTypes.CHAR(2),
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('ATIVA', 'INATIVA'),
    defaultValue: 'ATIVA'
  }
}, {
  tableName: 'unidades',
  timestamps: false
});

module.exports = Unidades;
