const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pagamentos = sequelize.define('Pagamentos', {
  id_pagamento: {
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
  metodo_pagamento: {
    type: DataTypes.STRING(30),
    allowNull: true
  },
  tipo_operacao: {
    type: DataTypes.ENUM('PAGAMENTO', 'ESTORNO'),
    defaultValue: 'PAGAMENTO'
  },
  status_pagamento: {
    type: DataTypes.ENUM('PENDENTE', 'APROVADO', 'RECUSADO', 'ESTORNADO'),
    defaultValue: 'PENDENTE'
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  protocolo_gateway: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  requisicao_mock: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  resposta_mock: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  data_transacao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'pagamentos',
  timestamps: false
});

module.exports = Pagamentos;
