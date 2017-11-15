const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const users = require('./controllers/user-controller.js');

const app = express();
const router = express.Router();

// handle bodyparser stuff
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// get static files to serve
app.use(express.static(path.join(__dirname, 'public')));

// handle routing
app.get('/', (req, res) => {
  res.send('Completed Get to Homepage');
});

app.post('/', (req, res) => {
  res.send('Completed Post to Homepage');
});

app.get('/users', users.getUsers);
app.get('/users/:id', users.getUserById);
app.post('/users', users.createUser);
app.put('/users/:id', users.updateUser);
app.delete('/users/:id', users.deleteUserById);

// Handle 404 Error
app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next();
});

// Handle other errors
app.use((err, req, res) => {
  console.log(err);
  res.status(err.status || 500).send();
});

// Start listening
const server = app.listen(3000);
console.log('Listening on port 3000');

module.exports = app;
