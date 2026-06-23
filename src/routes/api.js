const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const pedidoController = require('../controllers/pedidoController');
const pagamentoController = require('../controllers/pagamentoController');
const cardapioController = require('../controllers/cardapioController');
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/authMiddleware');

const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));

// Documentação
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Públicas
router.post('/usuarios', usuarioController.cadastrar);
router.post('/login', usuarioController.login);

// Protegidas
router.use(authMiddleware);

router.get('/usuarios/perfil', usuarioController.obterPerfil);

// Pedidos
router.post('/pedidos', pedidoController.criar);
router.get('/pedidos', pedidoController.listar);
router.get('/pedidos/:id_pedido', pedidoController.obter);
router.put('/pedidos/:id_pedido/cancelar', pedidoController.cancelar);

// Pagamentos
router.post('/pagamentos', pagamentoController.processar);
router.get('/pagamentos', pagamentoController.listar);
router.get('/pagamentos/:id_pagamento', pagamentoController.obter);
router.post('/pagamentos/:id_pagamento/estornar', pagamentoController.estornar);

// Cardápio
router.get('/cardapio/:id_unidade', cardapioController.listarPorUnidade);

module.exports = router;