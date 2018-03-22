'use strict';

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');
console.log(petsPath);

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

app.disable('x-powered-by');

app.get('/pets', function(req, res){
  fs.readFile(petsPath, 'utf8', function(err, data){
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }
    var pets = JSON.parse(data);
    //res.sendStatus(200);
    console.log("booyah");
    res.status(200).send(pets);
  })
})

app.get('/pets/:id', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, data){
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var petId = Number.parseInt(req.params.id);
    var pets = JSON.parse(data);

    if (petId < 0 || petId >= pets.length || Number.isNaN(petId)) {
      return res.sendStatus(404);
    }

    res.set('Content-Type', 'text/plain');
    res.send(pets[petId]);
  });
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});

// app.get('/pets/:id', function(req, res){
//
// })
//
//
// const server = http.createServer((request, response) => {
//     let path = request.url.split("/");
//     let index = path[2];
//  if (request.url === '/pets') {
//     fs.readFile('pets.json', 'utf8', (err, data)=>{
//       response.setHeader('Content-Type', 'application/json');
//       response.end(data);
//     })
//     response.statusCode = 200;
//  } else {
//     fs.readFile("pets.json", "utf8", (err, data)=>{
//       let pets = JSON.parse(data)[index];
//       if (pets){
//         response.setHeader('Content-Type', 'application/json');
//         response.end(JSON.stringify(pets));
//         response.statusCode = 200;
//       } else {
//         response.setHeader('Content-Type', 'text/plain');
//         response.statusCode = 404;
//         response.end('Not Found');
//       }
//     })
//  }
// }).listen(8000);
//
// module.exports = server;
