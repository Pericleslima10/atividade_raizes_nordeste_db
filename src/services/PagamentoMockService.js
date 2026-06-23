class PagamentoMockService {
  
  static async processar(dados) {
    const { valor, metodo_pagamento, id_pedido } = dados;

    if (!valor || valor <= 0) return this._formatarRetorno('RECUSADO', null, 'Valor inválido', { error: 'INVALID_AMOUNT' }, dados);
    if (!metodo_pagamento) return this._formatarRetorno('RECUSADO', null, 'Método de pagamento obrigatório', { error: 'INVALID_METHOD' }, dados);

    const aprovado = Math.random() > 0.15;
    
    if (aprovado) {
      const protocolo = this.gerarProtocolo();
      return this._formatarRetorno('APROVADO', protocolo, 'Sucesso', { 
        success: true, 
        protocol: protocolo, 
        masked_account: '****' + Math.random().toString(36).substring(2, 8).toUpperCase() 
      }, dados);
    }

    return this._formatarRetorno('RECUSADO', null, 'Transação recusada', { error: 'DECLINED' }, dados);
  }

  static async estornar(dados) {
    const { id_pagamento_original } = dados;

    if (!id_pagamento_original) return this._formatarRetorno('RECUSADO', null, 'Pagamento não encontrado', { error: 'NOT_FOUND' }, dados);

    const sucesso = Math.random() > 0.05;
    return sucesso 
      ? this._formatarRetorno('ESTORNADO', this.gerarProtocolo(), 'Estorno realizado', { success: true }, dados)
      : this._formatarRetorno('RECUSADO', null, 'Falha no estorno', { error: 'REFUND_FAILED' }, dados);