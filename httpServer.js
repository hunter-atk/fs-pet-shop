

const http = require('http');
const fs = require('fs');


const server = http.createServer((request, response) => {
    let path = request.url.split("/");
    let index = path[2];
 if (request.url === '/pets') {
    fs.readFile('pets.json', 'utf8', (err, data)=>{
      response.setHeader('Content-Type', 'application/json');
      response.end(data);
    })
    response.statusCode = 200;
 } else {
    fs.readFile("pets.json", "utf8", (err, data)=>{
      let pets = JSON.parse(data)[index];
      if (pets){
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(pets));
        response.statusCode = 200;
      } else {
        response.setHeader('Content-Type', 'text/plain');
        response.statusCode = 404;
        response.end('Not Found');
      }
    })
 }
}).listen(8000);

module.exports = server;
