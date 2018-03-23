'use strict';

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');
console.log(petsPath);

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

var morgan = require('morgan');
var bodyParser = require('body-parser');

app.disable('x-powered-by');
app.use(morgan('short'));
app.use(bodyParser.json());

app.get('/pets', function(req, res){
  fs.readFile(petsPath, 'utf8', function(err, data){
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }
    var pets = JSON.parse(data);

    res.status(200).send(pets);
  })
})

app.post('/pets', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, data) {

    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var pets = JSON.parse(data);
    var petAge = Number(req.body.age);
    var petKind = req.body.kind;
    var petName = req.body.name;

    function NewPet(petAge, petKind, petName) {
    this.age = petAge;
    this.kind = petKind;
    this.name = petName;
    }

    if(!petAge || !petKind || !petName){
      return res.status(400).send("age=[input] kind=[input] name=[input]");
    }

    var pet = new NewPet(petAge, petKind, petName);

    if (!pet) {
      return res.sendStatus(400);
    }

    pets.push(pet);

    var newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, newPetsJSON, function(err) {
      if (err) {
        console.error(err.stack);
        return res.sendStatus(500);
      }

      res.set('Content-Type', 'text/plain');
      res.send(pet.name);
    });
  });
});

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

app.patch('/pets/:id', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, data) {

    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var petId = Number.parseInt(req.params.id);
    var pets = JSON.parse(data);
    var petAge = req.body.age;
    var petKind = req.body.kind;
    var petName = req.body.name;

    if (petId < 0 || petId >= pets.length || Number.isNaN(petId)) {
      return res.sendStatus(404);
    }

    if(!petAge && !petKind && !petName){
      return res.status(400).send("age=[input] kind=[input] name=[input]");
    }

    if(petAge){
      fs.writeFile(petsPath, data, function(err) {
        if (err) {
          console.error(err.stack);
          return res.sendStatus(500);
        }

        pets[petId].age = petAge;
        res.set('Content-Type', 'text/plain');
        res.send(pets[petId].age);
      });
    }
  });
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
