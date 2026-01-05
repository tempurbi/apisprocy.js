const express = require('express');
const fetch = require('node-fetch');
const url = require('url');

const app = express();

const port = process.env.PORT || 3000; 


const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbydHw-YkeUG0LpxnEUZck9sHMwPYjvWhZARaBQVAFZhjGNyjrTnSy2VQgnR-ABT_qqZ/exec';


app.get('/api/proxy', async (req, res) => {
    // Para depuração
    console.log(`Requisição recebida: ${req.url}`);
    
    try {
     
        const queryString = url.parse(req.url).query;

        if (!queryString) {
            return res.status(200).send("Proxy Ready. Send data via Query String.");
        }
        
       
        const targetUrl = APPS_SCRIPT_URL + '?' + queryString;
        
    
        await fetch(targetUrl);
        
        
        res.status(200).send('OK');
        
    } catch (error) {
        console.error("Erro no Proxy:", error);
        res.status(500).send('FUNCTION_INVOCATION_FAILED');
    }
});

app.listen(port, () => {
    console.log(`Proxy Heroku rodando na porta ${port}`);
});
