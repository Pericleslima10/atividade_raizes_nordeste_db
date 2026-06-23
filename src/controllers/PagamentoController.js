// Dentro do PagamentoController

// DICA: O Controller deve ser apenas o "porteiro". 
// Ele valida a entrada e chama um Serviço para resolver o problema.

static async processar(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const { id_pedido, metodo_pagamento } = req.body;
    
    // 1. Validações rápidas de entrada (Guard Clauses)
    this._validarEntrada(req.body);

    // 2. Busca o pedido (Delegação para o Model)
    const pedido = await Pedidos.findByPk(id_pedido, { transaction });
    if (!pedido || pedido.id_usuario !== req.userId) {
      throw { status: 404, mensagem: 'Pedido não encontrado ou sem permissão' };
    }
    
    // 3. Verifica estado do pedido
    if (pedido.status_pedido !== 'AGUARDANDO_PAGAMENTO') {
      throw { status: 409, mensagem: `Pedido inválido: ${pedido.status_pedido}` };
    }

    // 4. Delega a lógica de negócio para o Service (Isso deixa o controller limpo!)
    const resultado = await PagamentoService.executar(pedido, metodo_pagamento, transaction);

    await transaction.commit();
    return res.status(200).json({ status: 'Sucesso', dados: resultado });

  } catch (error) {
    await transaction.rollback();
    return this._tratarErro(res, error);
  }
}

// Criar métodos privados (ou auxiliares) para limpar o código
static _validarEntrada({ id_pedido, metodo_pagamento }) {
  if (!id_pedido || !metodo_pagamento) {
    throw { status: 422, mensagem: 'Dados obrigatórios ausentes' };
  }
}