const jwt = require('jsonwebtoken');
const express = require('express');
const { error } = require('winston');
const app = express();

const SECRET_KEY = '1234AB';
const JWT_EXPIRATION_TIME = '1h';

app.use(express.json());

// Função para gerar o JWT com "exp" (data de expiração)
function do_login(req, res) {
    const { username, password } = req.body;
    
    if (username !== 'admin' || password !== 'senha123') {
        return res.status(401).json({ error: 'Credenciais inválidas'});
    }
    
    // Payload do JWT, incluindo a data de expiração
    const payload = {
        username,
        exp: Math.floor(Date.now() / 1000) + 60 // Expiração em 1 hora
    };

    // Geração do token JWT
    const jwt_token = jwt.sign(payload, SECRET_KEY);

    // Retorno do token para o frontend
    return res.json({ jwt_token});
}

// Função para validar o JWT
function do_SomeAction(req, res) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    //Verifica se token é válido e se não expirou
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido ou expirado'});
        }

        // Se o token for válido, execute a ação
        return res.json({ sucess: 'Ação executada com sucesso!'});
    });
}

app.post('/auth', do_login);
app.post('/do_SomeAction', do_SomeAction);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});