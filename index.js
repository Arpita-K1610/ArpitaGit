const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Main page route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Login page route
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

// Login form submission route
app.post('/login', (req, res) => {
  const { username } = req.body;
  res.cookie('username', username);
  res.redirect('/');
});

// Message form submission route
app.post('/send', (req, res) => {
  const { message } = req.body;
  const username = req.cookies.username;

  if (username && message) {
    const data = `${username}: ${message}\n`;

    fs.appendFile('messages.txt', data, (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      }
    });
  }
  res.redirect('/');
});

// Get messages route
app.get('/messages', (req, res) => {
  fs.readFile('messages.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.json([]);
    } else {
      const messages = data
        .split('\n')
        .filter(Boolean)
        .map((message) => {
          const [username, ...messageContent] = message.split(': ');
          return { username, message: messageContent.join(': ') };
        });
      res.json(messages);
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
