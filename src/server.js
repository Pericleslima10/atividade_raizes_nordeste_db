const express = require('express');
const sequelize = require('./config/database');
const apiRoutes = require('./routes/api');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use(express.json());

// Configuração do Swagger
try {
  const swaggerUi = require('swagger-ui-express');
  const swaggerSpec = require('./config/swagger');
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    swaggerOptions: { persistAuthorization: true }
  }));
} catch (err) {
  console.warn('Swagger não disponível.');
}

app.use('/api', apiRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Banco de dados conectado.');
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch(err => {
    console.error('Falha ao iniciar:', err);
    process.exit(1);
  });