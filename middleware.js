module.exports = (req, res, next) => {
  // Simular autenticação
  if (req.path === '/autenticacao/login' && req.method === 'POST') {
    const { username, password } = req.body;
    if (username && password) {
      return res.status(200).json({
        token: 'mock-jwt-token-12345',
        user: { id: 1, name: 'Usuário Mock' }
      });
    }
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }

  // Simular refresh token
  if (req.path === '/autenticacao/refresh' && req.method === 'PUT') {
    return res.status(200).json({
      token: 'new-mock-jwt-token-67890'
    });
  }

  // Adicionar delay para simular API real
  setTimeout(next, 300);
};
