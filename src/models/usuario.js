const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const Usuario = sequelize.define('Usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true
  },
  senha_hash: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING(14),
    allowNull: true
  },
  telefone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  // Adicionamos o perfil direto aqui para simplificar seu MVP!
  perfil: {
    type: DataTypes.ENUM('CLIENTE', 'ADMIN', 'GERENTE'),
    defaultValue: 'CLIENTE',
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('ATIVO', 'INATIVO'),
    defaultValue: 'ATIVO',
    allowNull: false
  },
  data_cadastro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'usuarios',
  timestamps: false
});

// Criptografia da senha no cadastro (LGPD)
Usuario.beforeCreate(async (usuario) => {
  if (usuario.senha_hash) {
    const salt = await bcrypt.genSalt(10);
    usuario.senha_hash = await bcrypt.hash(usuario.senha_hash, salt);
  }
});

module.exports = Usuario;