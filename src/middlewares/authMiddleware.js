const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensagem: "Token não fornecido." });
  }

  const [scheme, token] = authHeader.split(' ');

  if (!/^Bearer$/i.test(scheme) || !token) {
    return res.status(401).json({ mensagem: "Formato de token inválido." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreta');
    req.userId = decoded.id;
    return next();
  } catch (err) {
    return res.status(401).json({ mensagem: "Token inválido ou expirado." });
  }
};