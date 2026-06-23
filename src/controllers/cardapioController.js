const { Cardapio, Produto } = require('../models');

const cardapioController = {
  listarPorUnidade: async (req, res) => {
    try {
      const { id_unidade } = req.params;

      // 1. Opcional: Se o id_unidade não for um número, já mata aqui
      if (isNaN(id_unidade)) {
        return res.status(400).json({ mensagem: "O ID da unidade deve ser um número válido." });
      }

      const cardapio = await Cardapio.findOne({
        where: { id_unidade, ativo: true }, // Short-hand do ES6: id_unidade: id_unidade é só id_unidade
        include: [{
          model: Produto,
          as: 'produtos',
          through: { attributes: [] }
        }]
      });

      // 2. Humano foca na experiência: se o cardápio for vazio, tratar como 404 é perfeito
      if (!cardapio) {
        return res.status(404).json({ 
          mensagem: `Nenhum cardápio ativo encontrado para a unidade ${id_unidade}.` 
        });
      }

      return res.status(200).json({
        status: "Sucesso",
        dados: cardapio // Renomear 'cardapio' para 'dados' ou 'resultado' padroniza suas respostas
      });

    } catch (error) {
      // 3. Log profissional: nunca expõe 'error.message' em produção para o usuário final por segurança
      console.error(`[CARDAPIO_CONTROLLER_ERROR]: ${error.message}`);
      
      return res.status(500).json({ 
        status: "Erro",
        mensagem: "Erro ao buscar cardápio. Tente novamente mais tarde." 
      });
    }
  }
};

module.exports = cardapioController;