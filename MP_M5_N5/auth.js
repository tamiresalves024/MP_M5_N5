let password = "senha123";
let username = "admin";

// Definir a quantidade mínima de caracteres para a senha
const MIN_PASSWORD_LENGTH = 8;
const MAX_ATTEMPTS = 3;
let attempts = 0;

// Função que verifica se o usuário já existe
function userExists(username) {
    return false;
}

// Função que verifica se uma senha válida
function isValidPassword(password) {
    if (password.length < MIN_PASSWORD_LENGTH) {
        return false
    }
    return true;
}

// Função de busca no banco de dados para verificar credenciais 
function lookupCredentialsInDatabase(username, password) {
    if (username === "admin" && password === "senha123") {
        return true;
    }
    return false;
}

// Verifica se o nome de usuário já está em uso
if (userExists(username)) {
    console.log("Já existe usuário com esse nome");
    return;
}

// Verifica se a senha atende ao comprimento mínimo
if (!isValidPassword(password)) {
    console.log("Senha deve ter pelo menos 8 caracteres.");
    return;
}

// Simula o processo de autenticação com limite de tentativas
function authenticate(username, password) {
    const isValid = lookupCredentialsInDatabase(username, password);

    if (isValid) {
        attempts = 0; // Reseta o contador de tentativas após um login bem-sucedido
        console.log("Login bem-sucedido!");
        return;
    } else {
        attempts += 1; // Incrementa as tentativas inválidas

        if (attempts >= MAX_ATTEMPTS) {
            console.log("Conta bloqueada após múltiplas tentativas inválidas.");
            return;
        }
        
        // Mensagem para falha de login 
        console.log("Usuário ou senha incorretos.");
    }
}

// Chama a função de autenticação
authenticate(username, password);