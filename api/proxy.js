// api/proxy.js 
const fetch = require('node-fetch'); 

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwpnbHFEBy_Yl04Oy2_VwnW6A88b5bLSzSxBih6twaulzs6r0itbFZ94KVnSrE3v885/exec';

module.exports = async (req, res) => {
  try {
    // 1. Pega os dados do Arduino (Query String: ?t_le=...&t_ld=...)
    const queryString = req.url.split('?')[1]; 
    
    
    const targetUrl = APPS_SCRIPT_URL + '?' + queryString;
    
   
    const googleRes = await fetch(targetUrl);
    
    // 4. Retorna 200 (OK) para o SIM800L
    res.status(googleRes.status).send('OK'); 
    
  } catch (error) {
    // Se o Apps Script ou o fetch falhar, retorna um erro do proxy
    console.error("Erro no Proxy:", error);
    res.status(500).send('Proxy Failed');
  }
};
