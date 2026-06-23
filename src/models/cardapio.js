const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cardapio = sequelize.define('Cardapio', {
  id_cardapio: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_unidade: { type: DataTypes.INTEGER, allowNull: false },
  descricao: { type: DataTypes.STRING(200) },
  ativo: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
  tableName: 'cardapio',
  timestamps: false
});

module.exports = Cardapio;