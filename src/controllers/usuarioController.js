// Exemplo de como delegar para um Service
static async criar(req, res) {
  try {
    // 1. O Controller só valida o que vem do HTTP (Camada de Interface)
    const dadosPedido = { ...req.body, id_usuario: req.userId };
    
    // 2. O Service resolve a regra de negócio (Camada de Domínio)
    const novoPedido = await PedidoService.processarCriacao(dadosPedido);

    return res.status(201).json({ status: 'Sucesso', dados: novoPedido });
  } catch (error) {
    // 3. Tratamento de erro centralizado
    return this._handleError(res, error);
  }
}