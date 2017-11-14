const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

// http://mongoosejs.com/docs/promises.html
//mongoose.Promise = global.Promise;
//mongoose.connect(config.dbUrl, { server : { socketOptions: { keepAlive: 120 } } });

// Make the express app and router
const app = express();
const router = express.Router();

if (app.get('env') !== 'production') app.use(logger('dev'));
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send();
  });
}

// Use bodyParser to parse json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware

// Routes
app.use('/', router);

router.route('/')
  .get((req, res, next) => {
    res.send('Complete'); 
  });

// Handle 404
app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next();
});

app.use((err, req, res) => {
  console.log(err);
  res.status(err.status || 500).send();
});

const server = app.listen(3000);

console.log('Listening on port 3000');

module.exports = app;
