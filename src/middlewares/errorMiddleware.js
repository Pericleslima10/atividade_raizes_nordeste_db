module.exports = (err, req, res, next) => {
  const statusCode = err.status || err.statusCode || 500;
  
  // Mapeamento de erros do Sequelize para status codes amigáveis
  const sequelizeErrors = {
    SequelizeValidationError: { code: 422, msg: err.errors?.map(e => e.message).join(', ') },
    SequelizeUniqueConstraintError: { code: 409, msg: 'Valor já cadastrado no sistema.' },
    SequelizeForeignKeyConstraintError: { code: 409, msg: 'Violação de integridade de dados.' }
  };

  const errorInfo = sequelizeErrors[err.name] || { code: statusCode, msg: err.message || 'Erro interno.' };

  const response = {
    mensagem: errorInfo.msg,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  };

  res.status(errorInfo.code).json(response);
};