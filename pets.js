// const fs = require('fs');
//
// let command = process.argv.slice(2);
// if(command[0]==="read"){
//     if (command[1]) {
//         fs.readFile('pets.json', (err, data)=>{
//           console.log(JSON.parse(data)[command[1]]);
//         })
//     } else {
//         fs.readFile('pets.json', (err, data)=>{
//           console.log(JSON.parse(data));
//         })
//     }
// } else if (command[0]==="create"){
//     if(command[3]){
//        fs.readFile('./pets.json', 'utf8', (err, data)=>{
//           let allPets = JSON.parse(data);
//           var newPet = {age: command[1], kind: command[2] , name: command[3]};
//           allPets.push(newPet);
//           let myData = JSON.stringify(allPets);
//           fs.writeFile('./pets.json', myData, (err)=>{
//             console.log(newPet);
//             console.error(err);
//           })
//        })
//     } else {
//          console.error('Usage: node pets.js create AGE KIND NAME');
//          process.exit(1);
//         }
// } else if (command[0]==="update"){
//     //update data here
// } else if (command[0]==="destroy"){
//     //destroy data here
// } else {
//      console.error(`Usage: node pets.js [read | create | update | destroy]`);
//      process.exit(1);
// }

const fs = require('fs');

let crud = {
    create: function (args = null) {
        if (args[2] === undefined) {
            console.error(`Usage: node pets.js create AGE KIND NAME`);
            process.exit(1);
        }
        fs.readFile('./pets.json', (err, data) => {
            let pets = JSON.parse(data);
            var newPet = { age: args[0], kind: args[1], name: args[2] };
            pets.push(newPet);
            let myData = JSON.stringify(pets);
            fs.writeFile('./pets.json', myData, (err) => {
                console.log(newPet);
                //console.error(err);
            })
        })
    },
    read: function (args = null) {
        if (args[1]) {
              fs.readFile('pets.json', (err, data)=>{
                console.log(JSON.parse(data)[args[1]]);
              })
        } else {
              fs.readFile('pets.json', (err, data)=>{
                console.log(JSON.parse(data));
              })
        }
    },
    destroy: function (args = null){
        if (args[0] === undefined){
          console.error(`Usage: node pets.js destroy INDEX`);
          process.exit(1);
        } else {
              fs.readFile('./pets.json', (err, data) => {
                  let pets = JSON.parse(data);
                  
                  var removePet = pets[args[0]];
                  pets.splice(removePet, 1);
                  let myData2 = JSON.stringify(pets);
                  fs.writeFile('./pets.json', myData2, (err) => {
                      console.log(removePet);
                      console.error(`Usage: node pets.js destroy INDEX`);
                    })
                })
        }
    },
    update: null
}


let command = process.argv.slice(2);

if (command[0] && crud[command[0]]) {
    crud[command[0]](command.slice(1));
} else {
    console.error(`Usage: node pets.js [read | create | update | destroy]`);
    process.exit(1);
}
