const http = require('http');
const PORT = 3000;

function requestHandler(request, response) {
  console.log(request.url);
  response.end('Hello Node.js Server!');
}

const server = http.createServer(requestHandler);

server.listen(PORT, err => {
  if (err) {
    return console.log('Something went wrong:', err)
  }

  console.log(`Server listening on ${PORT}`);
});
