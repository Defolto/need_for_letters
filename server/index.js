const app = require('express')();
const path = require('path');
const http = require('http').Server(app);
const express = require('express');
const port = 9000;

var Datastore = require('nedb');
var db_users = new Datastore({filename : './server/db/users.json'});
db_users.loadDatabase();

// выход в корневую папку
app.use(express.static(path.resolve(__dirname, '../dist')));
// для работы с request
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

app.post('/api/regNewUser', function(request, response){
    if (typeof(request.body.data.newUser) == "object") {
        db_users.insert(request.body.data.newUser);
        response.json(request.body.data.newUser);
    } else {
        response.json("error");
    }
});

app.post('/api/logIn', function(request, response){
    db_users.findOne({ $or: [{email: request.body.data.user.email}, {login: request.body.data.user.email}]}, function (err, docs) {
        if(!err) {
            if (request.body.data.user.password == docs.password) {
                response.json(docs);
            }
        }else{
            console.log("Акк нет");
        }
    });
});

http.listen(port, () => {
    console.log(`listening on *:${port}`);
});