const express = require('express');
const fetch = require('node-fetch');
const url = require('url');

const app = express();
const port = process.env.PORT || 3000;

// Substitua pelo SEU link completo de DEPLOY do Apps Script
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/SEU_TOKEN_AQUI/exec';

app.get('/api/proxy', async (req, res) => {
    try {
        // Pega a query string
        const queryString = url.parse(req.url).query;

        if (!queryString) {
            return res.status(200).send("Proxy Ready. Send data via Query String.");
        }

        // Monta o URL de destino HTTPS
        const targetUrl = APPS_SCRIPT_URL + '?' + queryString;

        // Faz a requisição HTTPS para o Google
        await fetch(targetUrl);

        // Retorna o status 200 para o SIM800L
        res.status(200).send('OK');

    } catch (error) {
        console.error("Erro no Proxy:", error);
        res.status(500).send('FUNCTION_INVOCATION_FAILED');
    }
});

app.listen(port, () => {
    console.log(`Proxy rodando na porta ${port}`);
});
