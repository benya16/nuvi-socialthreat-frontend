/**
 * Created by bjami on 14/04/2017.
 */
var express = require('express');
var app = express();
var path = require('path');
var http = require('http');
var pgp = require('pg-promise')();

var connection = {
    host: 'localhost',
    port: 5432,
    database: 'manualthreats',
    user: 'go',
    password: 'gogo2017'
};

var db = pgp(connection);
var server = http.createServer(app);

var io = require('socket.io').listen(server);
var socket = require('./socket.js');
io.sockets.on('connection', socket);

app.use(express.static(path.join(__dirname, 'app')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'app/index.html'));
});

app.get('/livedata', function (req, res)
{
    db.query("select * from post order by collected desc limit 20").then(function(result)
    {
        res.json(result);
    });
});

app.get('/liveupdate', function(req, res)
{
    db.query("select * from post order by collected desc limit 1").then(function(result)
    {
        res.json(result);
    });
});

app.post('/liveupdate', function(req, res)
{
    console.log("POST: live update");
    io.sockets.emit('liveupdate');
    res.send("OK");
});

server.listen(3000, function() {
    console.log('Social Threat listening on port 3000!');
});
server.on('listening', onListening);

function onListening() {
    console.log('Listening on port ' + server.address().port);
}
