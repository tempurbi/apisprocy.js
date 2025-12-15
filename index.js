const express = require('express');
const fetch = require('node-fetch');
const url = require('url');

const app = express();
// O Heroku define a porta automaticamente na variável de ambiente PORT
const port = process.env.PORT || 3000; 

// !!! SUBSTITUA PELA SUA URL COMPLETA DO GOOGLE APPS SCRIPT !!!
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwpnbHFEBy_Yl04Oy2_VwnW6A88b5bLSzSxBih6twaulzs6r0itbFZ94KVnSrE3v885/exec';

// Recebe a requisição GET no caminho /api/proxy
app.get('/api/proxy', async (req, res) => {
    // Para depuração
    console.log(`Requisição recebida: ${req.url}`);
    
    try {
        // Pega a query string (ex: t_le=27.75&t_ld=25.75)
        const queryString = url.parse(req.url).query;

        if (!queryString) {
            return res.status(200).send("Proxy Ready. Send data via Query String.");
        }
        
        // Monta o URL de destino HTTPS para o Google
        const targetUrl = APPS_SCRIPT_URL + '?' + queryString;
        
        // Faz a requisição HTTPS para o Google Apps Script
        await fetch(targetUrl);
        
        // **IMPORTANTE:** O Heroku responde 200 OK via HTTP (porta 80)
        res.status(200).send('OK');
        
    } catch (error) {
        console.error("Erro no Proxy:", error);
        res.status(500).send('FUNCTION_INVOCATION_FAILED');
    }
});

app.listen(port, () => {
    console.log(`Proxy Heroku rodando na porta ${port}`);
});
