const express = require('express');

const app = express();
const port = 3001;

app.get('/', (request, response) => {
  response.send('Server loaded');
});

app.listen(port, err => {
  if (err) {
    return console.log('Something went wrong', err);
  }

  console.log(`Server listening on ${port}`);
});
