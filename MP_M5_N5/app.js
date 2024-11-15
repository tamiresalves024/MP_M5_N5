const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

// Configuração da chave secreta para o JWT
const SECRET_KEY = 'chavesupersecreta';

// Middleware para verificar o token JWT
function validateToken(req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '');  // Pega o token do header "Authorization"
  
    if (!token) {
      return res.status(403).json({ message: 'Token não fornecido' });
    }
  
    // Verifica se o token é válido
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Token inválido ou expirado' });
      }
  
      // Adiciona os dados decodificados no objeto request
      req.user = decoded;
      next();
    });
  }
  

app.post('/api/auth/login', (req, res) => {
    const credentials = req.body;
    let userData;
  
    userData = doLogin(credentials);
  
    if (userData) {
      // Gera o payload com id e perfil do usuário
      const payload = { user_id: userData.id, perfil: userData.perfil };
  
      // Gera o token com expiração de 1 hora
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  
      res.json({ token });  // Retorna o token no corpo da resposta
    } else {
      res.status(401).json({ message: 'Credenciais inválidas' });
    }
  });
  

// Rota protegida que exige autenticação
app.get('/confidential-data', authenticateToken, (req, res) => {
    const jsonData = { data: 'Dados confidenciais' }; // Simula um retorno de dados
    
    // Retorna os dados protegidos
    res.json(jsonData);
});

app.get('/api/users/:sessionid', validateToken, (req, res) => {
    // Verifica se o perfil do usuário é 'admin'
    if (req.user.perfil !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado. Perfil não autorizado.' });
    }
  
    res.status(200).json({ data: users });
  });

  app.get('/api/contracts/:empresa/:inicio/:sessionid', validateToken, (req, res) => {
    const empresa = sanitizeInput(req.params.empresa);
    const dtInicio = sanitizeInput(req.params.inicio);
  
    const result = getContracts(empresa, dtInicio);
  
    if (result) {
      res.status(200).json({ data: result });
    } else {
      res.status(404).json({ data: 'Dados Não encontrados' });
    }
  });  
  
// Inicializa o servidor 
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
