const http = require('http');

const PORT = process.env.PORT || 8080;

const server = http.createServer(async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Health Check
  if (req.url === '/api/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', message: 'Visual AI Zero-Dep Backend' }));
    return;
  }

  // Chat Message
  if (req.url === '/api/chat/message' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const { message } = JSON.parse(body);
        
        const azureUrl = `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}/chat/completions?api-version=${process.env.AZURE_OPENAI_API_VERSION}`;
        
        const response = await fetch(azureUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': process.env.AZURE_OPENAI_KEY
          },
          body: JSON.stringify({
            messages: [
              { role: 'system', content: 'Você é um assistente de vendas da Visual AI. Seja curto e direto.' },
              { role: 'user', content: message }
            ]
          })
        });

        const data = await response.json();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ text: data.choices[0].message.content }));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end();
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
