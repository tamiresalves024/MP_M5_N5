const mysql = require('mysql2');

// Conexão com o banco de dados MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'senha123',
    database: 'meu_banco'
});

function doDBAction(id) {
    // Utilizando uma consulta parametrizada
    const query = "SELECT * FROM user WHERE userID = ?";

    // A função query do mysql2 aceita parâmetros passados como array
    connection.execute(query, [id], (err, results) => {
        if (err) {
            console.error('Erro na consulta:', err);
            return;
        }
        console.log('Resultados:', results);
    });
}