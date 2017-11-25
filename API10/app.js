const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware
router.param('id', (req, res, next, id) => {
  if (!id.match(/^[0-9a-fA-f]{24}$/))
    return res.status(400).send('Invalid ID');
  next();
});

// Routing
//
app.use('/', router);

// Route to get all songs
// To post on homepage
router.route('/')
.get()
.post();

// Handle 404 Error
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Handle development error
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send();
  });
}

// Handle production error
app.use((err, req, res, next) => {
  res.status(err.status || 500).send();
});

const server = app.listen(3000);

module.exports = app;
