document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    document.getElementById('username').value = '';
  
    localStorage.setItem('username', username);
    document.getElementById('usernameDisplay').textContent = username;
    document.getElementById('messageForm').style.display = 'block';
  });
  
  document.getElementById('messageForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const message = document.getElementById('message').value;
    document.getElementById('message').value = '';
  
    const data = {
      message: message,
    };
  
    fetch('/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  });
  
  async function displayMessages() {
    const response = await fetch('/messages');
    const messages = await response.json();
    const messagesList = document.getElementById('messagesList');
    messagesList.innerHTML = '';
  
    messages.forEach((messageObj) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${messageObj.username}: ${messageObj.message}`;
      messagesList.appendChild(listItem);
    });
  }
  
  displayMessages();
  