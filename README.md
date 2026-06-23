API Uninter - Fluxo A
Sistema de gerenciamento de pedidos, focado em alta disponibilidade, auditoria e conformidade com a LGPD. Este projeto implementa o "Fluxo A": Pedido → Pagamento → Atualização de Status.

🎯 Visão Geral
Esta API foi desenhada para automatizar o ciclo de vida do pedido. Destaques:

Segurança: Autenticação via JWT.

Resiliência: Transações de banco de dados com rollback.

Confiabilidade: Mock de pagamento com 85% de sucesso.

Auditoria: Rastreio de todas as ações sensíveis.

Compliance: Totalmente adequado à LGPD.

🚀 Primeiros Passos
Pré-requisitos
Node.js v14+

PostgreSQL v12+

NPM ou Yarn

Instalação
Clone e instale:

Bash
git clone <seu-repositorio>
cd UNINTER
npm install
Configure o arquivo .env (use o .env.example como base).

Prepare o banco:

Bash
psql -U postgres -d uninter_db -f database/schema.sql
psql -U postgres -d uninter_db -f database/seed.sql
Execução
Desenvolvimento: npm run dev

Produção: npm start

📚 Documentação
A documentação interativa está disponível logo após iniciar o servidor:
👉 http://localhost:3000/api-docs

🔄 Fluxo A: Guia de Teste
Para testar o fluxo de ponta a ponta:

Login: POST /api/login (receba o token).

Pedido: POST /api/pedidos (use o token no header Authorization).

Pagamento: POST /api/pagamentos (use o id_pedido retornado).

Status: GET /api/pedidos/:id (o status mudará para RECEBIDO).

🔐 LGPD e Segurança
A privacidade é prioridade:

Dados Sensíveis: Hash de senhas (bcrypt) e mascaramento de dados de cartão.

Auditoria: A tabela auditoria registra o histórico de cada ação do usuário.

Consentimento: O campo termo_lgpd_aceito é obrigatório no cadastro.

📂 Estrutura do Projeto
Plaintext
src/
├── config/      # DB e Swagger
├── controllers/ # Lógica de entrada
├── middlewares/ # Autenticação e erros
├── models/      # Entidades (Sequelize)
├── routes/      # Endpoints
└── services/    # Regras de negócio (Pagamento, Auditoria)