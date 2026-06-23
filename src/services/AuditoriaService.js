const { Auditoria } = require('../models');

module.exports = {
  /**
   * Registra eventos do sistema para fins de auditoria/LGPD.
   * Dispara um log de erro apenas se a persistência falhar.
   */
  async registrar(id_usuario, entidade, id_entidade, acao, descricao) {
    try {
      await Auditoria.create({
        id_usuario,
        entidade,
        id_entidade,
        acao,
        descricao,
        data_hora: new Date()
      });
    } catch (err) {
      // Registrar falha de auditoria sem interromper o fluxo principal do usuário
      console.error(`[AUDITORIA_FAILURE] ${acao} na entidade ${entidade}:`, err.message);
    }
  }
};