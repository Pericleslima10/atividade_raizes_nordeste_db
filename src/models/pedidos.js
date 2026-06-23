const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pedidos = sequelize.define('Pedidos', {
  id_pedido: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios',
      key: 'id_usuario'
    }
  },
  id_unidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'unidades',
      key: 'id_unidade'
    }
  },
  id_promocao: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'promocoes',
      key: 'id_promocao'
    }
  },
  canal_pedido: {
    type: DataTypes.ENUM('APP', 'WEB', 'TOTEM', 'BALCAO', 'PICKUP'),
    allowNull: false
  },
  status_pedido: {
    type: DataTypes.ENUM(
      'AGUARDANDO_PAGAMENTO',
      'RECEBIDO',
      'EM_PREPARO',
      'PRONTO',
      'ENTREGUE',
      'CANCELADO'
    ),
    defaultValue: 'AGUARDANDO_PAGAMENTO'
  },
  valor_total: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  usa_fidelidade: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  pontos_utilizados: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  pontos_gerados: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  data_pedido: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'pedidos',
  timestamps: false
});

module.exports = Pedidos;
