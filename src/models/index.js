const sequelize = require('../config/database');
const Usuario = require('./usuario');
const Cardapio = require('./cardapio');
const Produto = require('./produto');
const Estoque = require('./estoque');
const Unidades = require('./unidades');
const CardapioProduto = require('./cardapio_produto');
const Pedidos = require('./pedidos');
const ItensPedido = require('./itens_pedido');
const Pagamentos = require('./pagamentos');
const Promocoes = require('./promocoes');
const Auditoria = require('./auditoria');
const Fidelidade = require('./fidelidade');

// Modelos não precisam de init() se usarem sequelize.define()
// Associações entre modelos
Pedidos.hasMany(ItensPedido, { foreignKey: 'id_pedido', onDelete: 'CASCADE' });
ItensPedido.belongsTo(Pedidos, { foreignKey: 'id_pedido' });

Pedidos.hasMany(Pagamentos, { foreignKey: 'id_pedido', onDelete: 'CASCADE' });
Pagamentos.belongsTo(Pedidos, { foreignKey: 'id_pedido' });

Pedidos.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Usuario.hasMany(Pedidos, { foreignKey: 'id_usuario' });

Pedidos.belongsTo(Unidades, { foreignKey: 'id_unidade' });
Unidades.hasMany(Pedidos, { foreignKey: 'id_unidade' });

Pedidos.belongsTo(Promocoes, { foreignKey: 'id_promocao' });
Promocoes.hasMany(Pedidos, { foreignKey: 'id_promocao' });

ItensPedido.belongsTo(Produto, { foreignKey: 'id_produto' });
Produto.hasMany(ItensPedido, { foreignKey: 'id_produto' });

Usuario.hasOne(Fidelidade, { foreignKey: 'id_usuario', onDelete: 'CASCADE' });
Fidelidade.belongsTo(Usuario, { foreignKey: 'id_usuario' });

// Associações adicionadas para o Cardápio
Cardapio.belongsToMany(Produto, { 
  through: CardapioProduto, 
  as: 'produtos', 
  foreignKey: 'id_cardapio' 
});

Produto.belongsToMany(Cardapio, { 
  through: CardapioProduto, 
  as: 'cardapios', 
  foreignKey: 'id_produto' 
});

module.exports = {
  sequelize,
  Usuario,
  Cardapio,
  Produto,
  Estoque,
  Unidades,
  CardapioProduto,
  Pedidos,
  ItensPedido,
  Pagamentos,
  Promocoes,
  Auditoria,
  Fidelidade
};