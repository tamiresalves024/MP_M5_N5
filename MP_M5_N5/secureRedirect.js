function redirectToUrl() {
    const url = new URL(window.location);
    let redirectUrl = url.searchParams.get('url'); // Obtém o valor da query string "url"
    
    if (redirectUrl) {
        // Remove caracteres CRLF (Carriage Return e Line Feed)
        redirectUrl = redirectUrl.replace(/[\r\n]+/g, '');
        
        // Validação para impedir redirecionamento para domínios externos
        const allowedDomain = window.location.hostname; // Domínio atual da aplicação
        const parsedUrl = new URL(redirectUrl); // Tenta fazer o parsing da URL
        
        if (parsedUrl.hostname === allowedDomain) {
            // Realiza o redirecionamento se a URL for válida e do mesmo domínio
            window.location.href = redirectUrl;
        } else {
            console.error('Redirecionamento não permitido para domínios externos.');
        }
    } else {
        console.error('URL inválida.');
    }
}
