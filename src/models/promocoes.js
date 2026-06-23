const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Promocoes = sequelize.define('Promocoes', {
  id_promocao: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  tipo_desconto: {
    type: DataTypes.ENUM('PERCENTUAL', 'VALOR_FIXO'),
    allowNull: false
  },
  valor_desconto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  data_inicio: {
    type: DataTypes.DATE,
    allowNull: false
  },
  data_fim: {
    type: DataTypes.DATE,
    allowNull: false
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'promocoes',
  timestamps: false
});

module.exports = Promocoes;
