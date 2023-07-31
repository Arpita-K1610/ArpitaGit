const express = require('express');
const session = require('express-session');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your_secret_key', // Replace with your own secret key
  resave: false,
  saveUninitialized: true,
}));

const db = mysql.createConnection({
  host: 'localhost', // Replace with your MySQL host
  user: 'root', // Replace with your MySQL user
  password:'Niteesh@1995', // Replace with your MySQL password
  database: 'candy_todos', // Use the database you created
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

app.get('/', (req, res) => {
  const buyValues = req.session.buyValues || {};

  db.query('SELECT * FROM candy_items', (err, rows) => {
    if (err) throw err;

    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Candy Todos</title>
      </head>
      <body>
        <h1>Todos List</h1>
        <ul>
          ${rows.map((item) => `
            <li>
              <strong>Name:</strong> ${item.name}<br>
              <strong>Description:</strong> ${item.description}<br>
              <strong>Price:</strong> ${item.price}<br>
              <strong>Quantity:</strong> ${item.quantity}<br>
              <button onclick="increaseQuantity(${item.id}, 'buy1')">Buy1</button>
              <button onclick="increaseQuantity(${item.id}, 'buy2')">Buy2</button>
              <button onclick="increaseQuantity(${item.id}, 'buy3')">Buy3</button>
              <span id="buy1-${item.id}">Buy1: ${buyValues[item.id]?.buy1 || 0}</span><br>
              <span id="buy2-${item.id}">Buy2: ${buyValues[item.id]?.buy2 || 0}</span><br>
              <span id="buy3-${item.id}">Buy3: ${buyValues[item.id]?.buy3 || 0}</span><br>
            </li>
          `).join('')}
        </ul>
        <form action="/addItem" method="post">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required><br>
          <label for="description">Description:</label>
          <input type="text" id="description" name="description" required><br>
          <label for="price">Price:</label>
          <input type="text" id="price" name="price" required><br>
          <label for="quantity">Quantity:</label>
          <input type="text" id="quantity" name="quantity" required><br>
          <button type="submit" onclick="clearLocalStorage()">Add Item</button>
        </form>
        <script>
          function increaseQuantity(id, buyButton) {
            const currentValue = parseInt(document.getElementById(buyButton + '-' + id).textContent) || 0;
            const newValue = prompt('Enter value for ' + buyButton + ':', currentValue);

            if (newValue !== null) {
              updateBuyValue(id, buyButton, newValue);
            }
          }

          function updateBuyValue(id, buyButton, value) {
            document.getElementById(buyButton + '-' + id).textContent = buyButton + ': ' + value;

            fetch('/saveBuyValue', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id, buyButton, value }),
            });
          }

          function clearLocalStorage() {
            localStorage.clear();
          }
        </script>
      </body>
      </html>
    `);
  });
});

app.post('/addItem', (req, res) => {
  const { name, description, price, quantity } = req.body;

  const newItem = {
    name: name,
    description: description,
    price: parseFloat(price),
    quantity: parseInt(quantity),
  };

  db.query('INSERT INTO candy_items SET ?', newItem, (err, result) => {
    if (err) throw err;
    console.log('Candy item added to the database');
    res.redirect('/');
  });
});

app.post('/saveBuyValue', (req, res) => {
  const { id, buyButton, value } = req.body;

  if (!req.session.buyValues) {
    req.session.buyValues = {};
  }

  req.session.buyValues[id] = {
    ...req.session.buyValues[id],
    [buyButton]: parseInt(value),
  };

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
