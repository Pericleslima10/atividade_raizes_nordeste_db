-- ============================================
-- SCRIPT FLUXO A - DADOS INICIAIS
-- Populate banco com dados para teste do Fluxo A
-- ============================================

-- 1. UNIDADES
INSERT INTO unidades (nome, endereco, cidade, estado, status) VALUES
('Unidade Centro', 'Av. Paulista 1000', 'São Paulo', 'SP', 'ATIVA'),
('Unidade Zona Leste', 'Rua Principal 500', 'São Paulo', 'SP', 'ATIVA'),
('Unidade Zona Oeste', 'Av. Brasil 2000', 'Osasco', 'SP', 'ATIVA');

-- 2. PRODUTOS
INSERT INTO produtos (nome, descricao, preco, ativo) VALUES
('Hamburger Duplo', 'Pão, 2 carnes, queijo, alface, tomate', 35.90, TRUE),
('Pizza Grande', 'Pizza de 8 fatias com mozzarela', 49.90, TRUE),
('Refrigerante 2L', 'Refrigerante de sua preferência', 12.00, TRUE),
('Fritas Grandes', 'Batata frita porção 500g', 18.90, TRUE),
('Salada Verde', 'Alface, tomate, pepino', 25.00, TRUE),
('Sobremesa Gelada', 'Sorvete premium 300ml', 15.90, TRUE);

-- 3. ESTOQUE
INSERT INTO estoque (id_unidade, id_produto, quantidade_atual) VALUES
(1, 1, 100),
(1, 2, 50),
(1, 3, 200),
(1, 4, 80),
(1, 5, 60),
(1, 6, 40),
(2, 1, 150),
(2, 2, 75),
(2, 3, 180),
(2, 4, 90),
(2, 5, 70),
(2, 6, 50),
(3, 1, 120),
(3, 2, 60),
(3, 3, 160),
(3, 4, 100),
(3, 5, 65),
(3, 6, 45);

-- 4. PROMOÇÕES
INSERT INTO promocoes (nome, descricao, tipo_desconto, valor_desconto, data_inicio, data_fim, ativo) VALUES
('Desconto Segunda-feira', 'Desconto de 10% em pedidos na segunda', 'PERCENTUAL', 10.00, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 365 DAY), TRUE),
('Cupom R$5 OFF', 'Desconto fixo de R$ 5', 'VALOR_FIXO', 5.00, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 365 DAY), TRUE);

-- 5. CARDAPIO
INSERT INTO cardapio (id_unidade, descricao, ativo) VALUES
(1, 'Cardápio Completo - Centro', TRUE),
(2, 'Cardápio Completo - Zona Leste', TRUE),
(3, 'Cardápio Completo - Zona Oeste', TRUE);

-- 6. CARDAPIO_PRODUTO
INSERT INTO cardapio_produto (id_cardapio, id_produto, preco_venda, disponivel) VALUES
-- Centro
(1, 1, 35.90, TRUE),
(1, 2, 49.90, TRUE),
(1, 3, 12.00, TRUE),
(1, 4, 18.90, TRUE),
(1, 5, 25.00, TRUE),
(1, 6, 15.90, TRUE),
-- Zona Leste
(2, 1, 35.90, TRUE),
(2, 2, 49.90, TRUE),
(2, 3, 12.00, TRUE),
(2, 4, 18.90, TRUE),
(2, 5, 25.00, TRUE),
(2, 6, 15.90, TRUE),
-- Zona Oeste
(3, 1, 35.90, TRUE),
(3, 2, 49.90, TRUE),
(3, 3, 12.00, TRUE),
(3, 4, 18.90, TRUE),
(3, 5, 25.00, TRUE),
(3, 6, 15.90, TRUE);

-- 7. USUÁRIOS DE TESTE
-- Senha: teste123
-- Hash: $2a$10$YourHashedPasswordHere (será criptografado pela aplicação)
INSERT INTO usuarios (nome, email, senha_hash, cpf, telefone, perfil, status, data_cadastro) VALUES
('João Silva', 'joao@test.com', '$2a$10$BsqjNgDBM.iVmJCfzQx9Ou9c1bXz0VJ0cG5n7K2m0u8ZQ8Z0Z0nJm', '123.456.789-00', '11999999999', 'CLIENTE', 'ATIVO', NOW()),
('Maria Santos', 'maria@test.com', '$2a$10$BsqjNgDBM.iVmJCfzQx9Ou9c1bXz0VJ0cG5n7K2m0u8ZQ8Z0Z0nJm', '987.654.321-00', '11988888888', 'CLIENTE', 'ATIVO', NOW()),
('Admin Test', 'admin@test.com', '$2a$10$BsqjNgDBM.iVmJCfzQx9Ou9c1bXz0VJ0cG5n7K2m0u8ZQ8Z0Z0nJm', '111.222.333-44', '11987654321', 'ADMIN', 'ATIVO', NOW());

-- 8. FIDELIDADE (Inicializa com 0 pontos)
INSERT INTO fidelidade (id_usuario, pontos) VALUES
(1, 0),
(2, 0),
(3, 0);

-- ============================================
-- FIM DO SEED
-- ============================================
-- Dados de teste para login:
-- Email: joao@test.com | Senha: teste123
-- Email: maria@test.com | Senha: teste123
-- Email: admin@test.com | Senha: teste123
-- ============================================
