const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ItensPedido = sequelize.define('ItensPedido', {
  id_item: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_pedido: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'pedidos',
      key: 'id_pedido'
    },
    onDelete: 'CASCADE'
  },
  id_produto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'produtos',
      key: 'id_produto'
    }
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  valor_unitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  }
}, {
  tableName: 'itens_pedido',
  timestamps: false
});

module.exports = ItensPedido;
