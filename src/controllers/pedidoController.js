const { sequelize, Pedidos, ItensPedido, Pagamentos, Usuario, Unidades, Produto } = require('../models');
const AuditoriaService = require('../services/AuditoriaService');

class PedidoController {
  static async criar(req, res) {
    const transaction = await sequelize.transaction();

    try {
      const { canalPedido, itens, id_unidade, usa_fidelidade } = req.body;
      const id_usuario = req.userId;

      if (!canalPedido || !Array.isArray(itens) || itens.length === 0) {
        return res.status(422).json({ mensagem: 'Dados inválidos.' });
      }

      const [unidade, usuario] = await Promise.all([
        Unidades.findByPk(id_unidade, { transaction }),
        Usuario.findByPk(id_usuario, { transaction })
      ]);

      if (!unidade || !usuario) return res.status(404).json({ mensagem: 'Unidade ou usuário não encontrado.' });

      let valorTotal = 0;
      const itensValidados = [];

      for (const item of itens) {
        const produto = await Produto.findByPk(item.id_produto, { transaction });
        if (!produto) throw new Error(`Produto ${item.id_produto} não encontrado`);
        
        const subtotal = produto.preco * item.quantidade;
        valorTotal += subtotal;
        itensValidados.push({ ...item, valor_unitario: produto.preco, subtotal });
      }

      const pedido = await Pedidos.create({
        id_usuario, id_unidade, canal_pedido: canalPedido,
        status_pedido: 'AGUARDANDO_PAGAMENTO', valor_total: valorTotal,
        usa_fidelidade: usa_fidelidade || false
      }, { transaction });

      await ItensPedido.bulkCreate(itensValidados.map(i => ({ ...i, id_pedido: pedido.id_pedido })), { transaction });

      await AuditoriaService.registrar(id_usuario, 'PEDIDO', pedido.id_pedido, 'CRIAR', `Criado via ${canalPedido}`);

      await transaction.commit();
      return res.status(201).json({ dados: pedido });

    } catch (error) {
      await transaction.rollback();
      return res.status(500).json({ mensagem: error.message });
    }
  }

  static async listar(req, res) {
    try {
      const { canalPedido, status, page = 1, limit = 10 } = req.query;
      const where = { id_usuario: req.userId, ...(canalPedido && { canal_pedido: canalPedido }), ...(status && { status_pedido: status }) };

      const result = await Pedidos.findAndCountAll({
        where, limit: parseInt(limit), offset: (page - 1) * limit,
        include: [ItensPedido], order: [['data_pedido', 'DESC']]
      });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ mensagem: 'Erro ao buscar pedidos.' });
    }
  }

  static async obter(req, res) {
    try {
      const pedido = await Pedidos.findOne({
        where: { id_pedido: req.params.id_pedido, id_usuario: req.userId },
        include: [ItensPedido, Pagamentos]
      });

      return pedido ? res.status(200