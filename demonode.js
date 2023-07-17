const http = require('http');
const fs = require('fs');

const port = 5000;
let messages = [];

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/') {
      messages = readMessages();
      const form = getForm(messages);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(form);
    } else {
      res.writeHead(404);
      res.end('Not Found');
    }
  } else if (req.method === 'POST') {
    if (req.url === '/') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', () => {
        const { message } = parseFormData(body);
        if (message) {
          messages.unshift(message);
          storeMessage(message);
        }
        res.writeHead(302, { Location: '/' });
        res.end();
      });
    } else {
      res.writeHead(404);
      res.end('Not Found');
    }
  }
});

const readMessages = () => {
  try {
    const data = fs.readFileSync('messages.txt', 'utf8');
    return data.trim().split('\n').reverse();
  } catch (err) {
    console.error('Error reading messages:', err);
    return [];
  }
};

const getForm = (messages) => {
  const messageList = messages.map((message) => `<li>${message}</li>`).join('');
  return `
    <h1>Message Board</h1>
    <form method="POST" action="/">
      <input type="text" name="message" placeholder="Enter your message" required/>
      <button type="submit">Send</button>
    </form>
    <h2>Messages:</h2>
    <ul>${messageList}</ul>
  `;
};

const storeMessage = (message) => {
  fs.appendFile('messages.txt', `${message}\n`, (err) => {
    if (err) {
      console.error('Error writing message:', err);
    }
  });
};

const parseFormData = (data) => {
  const formData = {};
  const params = new URLSearchParams(data);
  for (let [key, value] of params) {
    formData[key] = value;
  }
  return formData;
};

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
