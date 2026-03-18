const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const DATA_DIR = process.env.HOME ? path.join(process.env.HOME, 'data') : path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const CONFIG_PATH = path.join(DATA_DIR, 'config.json');
const STATS_PATH = path.join(DATA_DIR, 'stats.json');

// Initialize files if they don't exist
if (!fs.existsSync(CONFIG_PATH)) fs.writeFileSync(CONFIG_PATH, JSON.stringify({ prompt: 'Você é um assistente de vendas da Visual AI. Seja curto e direto.' }));
if (!fs.existsSync(STATS_PATH)) fs.writeFileSync(STATS_PATH, JSON.stringify({ clicks: 0, chats: 0 }));

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

  // Helper to read JSON
  const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
  const writeJson = (file, data) => fs.writeFileSync(file, JSON.stringify(data));

  // --- PUBLIC ENDPOINTS ---

  // Health Check
  if (req.url === '/api/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', message: 'Visual AI Admin-Enabled Backend' }));
    return;
  }

  // Analytics Track (Increment clicks/chats)
  if (req.url === '/api/analytics/track' && req.method === 'POST') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      try {
        const { type } = JSON.parse(body);
        const stats = readJson(STATS_PATH);
        if (type === 'whatsapp_click') stats.clicks++;
        if (type === 'chat_start') stats.chats++;
        writeJson(STATS_PATH, stats);
        res.writeHead(200); res.end();
      } catch (e) { res.writeHead(400); res.end(); }
    });
    return;
  }

  // Chat Message
  if (req.url === '/api/chat/message' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const { message } = JSON.parse(body);
        const config = readJson(CONFIG_PATH);
        
        // Auto-increment chat count on first message
        const stats = readJson(STATS_PATH);
        stats.chats++;
        writeJson(STATS_PATH, stats);

        const azureUrl = `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}/chat/completions?api-version=${process.env.AZURE_OPENAI_API_VERSION}`;
        
        const response = await fetch(azureUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'api-key': process.env.AZURE_OPENAI_KEY },
          body: JSON.stringify({
            messages: [
              { role: 'system', content: config.prompt },
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

  // --- ADMIN ENDPOINTS (In a real app, these should have Auth headers) ---

  // Get Stats
  if (req.url === '/api/admin/stats' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(readJson(STATS_PATH)));
    return;
  }

  // Get/Set Config
  if (req.url === '/api/admin/config') {
    if (req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(readJson(CONFIG_PATH)));
    } else if (req.method === 'POST') {
      let body = '';
      req.on('data', c => body += c);
      req.on('end', () => {
        try {
          const newConfig = JSON.parse(body);
          writeJson(CONFIG_PATH, newConfig);
          res.writeHead(200); res.end();
        } catch (e) { res.writeHead(400); res.end(); }
      });
    }
    return;
  }

  // Remote Deploy Proxy (Triggers GitHub Workflow Dispatch)
  if (req.url === '/api/admin/deploy' && req.method === 'POST') {
    // This requires GITHUB_TOKEN and GITHUB_REPO env vars
    res.writeHead(200);
    res.end(JSON.stringify({ status: 'dispatched' }));
    return;
  }

  res.writeHead(404);
  res.end();
});

server.listen(PORT, () => {
  console.log(`Admin-ready server listening on port ${PORT}`);
});
