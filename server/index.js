const app = require('express')();
const path = require('path');
const http = require('http').Server(app);
const express = require('express');
const port = 9000;

var Datastore = require('nedb');
const { getMaxListeners } = require('process');
var db_users = new Datastore({filename : './server/db/users.json'});
db_users.loadDatabase();

// выход в корневую папку
app.use(express.static(path.resolve(__dirname, '../dist')));
// для работы с request
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

// app.post('/api/regNewUser', function(request, response){
//     if (typeof(request.body.data.newUser) == "object") {
//         let newUser = {
//             email:  request.body.data.newUser.email,
//             login: request.body.data.newUser.login,
//             password: request.body.data.newUser.password,
//             coin: 0,
//             regData: new Date(),
//             maxSpeed: 0,
//             countWrittenLetters: 0,
//             averageSpeed_graf: [],
//             errorsLetters_graf: [],
//             countLettersFor7Days_graf: []
//         }
//         db_users.insert(newUser);
//         response.json(newUser);
//     } else {
//         response.json("error");
//     }
// });

app.post('/api/logIn', function(request, response){
    console.log("Вызвали запрос");
    db_users.insert({
        email: "defoltspam@gmail.com",
        name: "Maxim",
        age: 12
    });
    // console.log(request.body.data.user);
    // db_users.findOne({ $or: [{email: request.body.data.user.email}, {login: request.body.data.user.email}]}, function (err, docs) {
    //     if(!err) {
    //         if (request.body.data.user.password == docs.password) {
    //             response.json(docs);
    //         }
    //         else{
    //             console.log("Нет аккаунта");
    //         }
    //     }
    // });
});

http.listen(port, () => {
    console.log(`listening on *:${port}`);
});