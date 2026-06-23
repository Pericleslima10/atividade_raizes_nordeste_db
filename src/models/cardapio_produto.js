const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CardapioProduto = sequelize.define('CardapioProduto', {
  id_cardapio_produto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_cardapio: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'cardapio',
      key: 'id_cardapio'
    }
  },
  id_produto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'produtos',
      key: 'id_produto'
    }
  },
  preco_venda: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  disponivel: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'cardapio_produto',
  timestamps: false
});

module.exports = CardapioProduto;
