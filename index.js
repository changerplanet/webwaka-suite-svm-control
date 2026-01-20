const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';

const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'module.manifest.json'), 'utf-8'));

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  
  if (req.url === '/health' || req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', module: manifest.moduleId, version: manifest.version }));
    return;
  }
  
  if (req.url === '/api/manifest') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(manifest));
    return;
  }
  
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${manifest.moduleId}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); min-height: 100vh; display: flex; align-items: center; justify-content: center; color: #fff; }
    .container { text-align: center; padding: 2rem; }
    h1 { font-size: 2.5rem; margin-bottom: 0.5rem; background: linear-gradient(90deg, #00d9ff, #00ff88); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .subtitle { color: #8892b0; margin-bottom: 2rem; }
    .card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 2rem; margin-top: 1rem; }
    .status { display: inline-block; padding: 0.5rem 1rem; background: rgba(0, 255, 136, 0.2); border: 1px solid #00ff88; border-radius: 20px; color: #00ff88; font-size: 0.875rem; }
    .info { margin-top: 1.5rem; color: #8892b0; font-size: 0.875rem; }
    .info span { color: #00d9ff; }
  </style>
</head>
<body>
  <div class="container">
    <h1>WebWaka SVM Control</h1>
    <p class="subtitle">Control Layer Module</p>
    <div class="card">
      <div class="status">Active</div>
      <div class="info">
        <p>Module ID: <span>${manifest.moduleId}</span></p>
        <p>Version: <span>${manifest.version}</span></p>
        <p>Suite: <span>${manifest.metadata.suite}</span></p>
        <p>Status: <span>${manifest.metadata.status}</span></p>
      </div>
    </div>
  </div>
</body>
</html>`);
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
  console.log(`Module: ${manifest.moduleId} v${manifest.version}`);
});
