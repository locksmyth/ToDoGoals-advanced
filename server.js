const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const querystring = require('querystring');

const PORT = process.env.PORT || 3000;
const sessions = {};

function loadUsers() {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'users.json'), 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    return {};
  }
}

const users = loadUsers();

function hashPwd(pwd) {
  return crypto.createHash('sha256').update(pwd).digest('hex');
}

function auth(username, password) {
  const hashed = hashPwd(password);
  return users[username] && users[username] === hashed;
}

function parseCookies(req) {
  const list = {};
  const cookie = req.headers.cookie;
  if (!cookie) return list;
  cookie.split(';').forEach(pair => {
    const parts = pair.split('=');
    list[parts.shift().trim()] = decodeURIComponent(parts.join('='));
  });
  return list;
}

function serveFile(res, filepath, contentType = 'text/html', status = 200) {
  fs.readFile(filepath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(status, { 'Content-Type': contentType });
    res.end(data);
  });
}

function serveStatic(req, res) {
  let filePath = path.join(__dirname, req.url);
  if (req.url === '/') filePath = path.join(__dirname, 'index.html');
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.html': 'text/html',
    '.json': 'application/json'
  };
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  serveFile(res, filePath, contentType);
}

const server = http.createServer((req, res) => {
  const cookies = parseCookies(req);
  const session = sessions[cookies.session];

  if (['/', '/index.html', '/to_do_goals.html'].includes(req.url) && !session) {
    res.writeHead(302, { Location: '/login.html' });
    return res.end();
  }

  if (req.url === '/login.html' && req.method === 'GET') {
    return serveFile(res, path.join(__dirname, 'login.html'));
  }

  if (req.url === '/login' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => (body += chunk.toString()));
    req.on('end', () => {
      const parsed = querystring.parse(body);
      if (auth(parsed.username, parsed.password)) {
        const id = crypto.randomBytes(16).toString('hex');
        sessions[id] = parsed.username;
        res.writeHead(302, {
          'Set-Cookie': `session=${id}; HttpOnly`,
          Location: '/to_do_goals.html'
        });
        res.end();
      } else {
        res.writeHead(302, { Location: '/login.html?error=1' });
        res.end();
      }
    });
    return;
  }

  if (req.url === '/logout') {
    if (cookies.session) delete sessions[cookies.session];
    res.writeHead(302, {
      'Set-Cookie': 'session=; Max-Age=0',
      Location: '/login.html'
    });
    return res.end();
  }

  serveStatic(req, res);
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
