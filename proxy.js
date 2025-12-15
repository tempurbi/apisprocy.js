// api/proxy.js (Exemplo de código Node.js)
module.exports = (req, res) => {
  // 1. Pega os dados do Arduino (Query String)
  const queryString = req.url.split('?')[1]; 

  // 2. Monta o URL de destino HTTPS
  const targetUrl = 'https://script.google.com/macros/s/AKfycbzSgZAjiRA7FWbWW4lDpFtZRH_ERPNPW1E_AP_Frz9407Wp38i0IVFqtop6Pwk152Ii/exec' + queryString;

  // 3. Faz a requisição HTTPS para o Google
  fetch(targetUrl)
      .then(googleRes => googleRes.text())
      .then(data => res.status(200).send(data)) // Retorna 200 ao Arduino
      .catch(error => res.status(500).send('Proxy Error'));
};
