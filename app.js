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

var server = http.createServer(app);

var io = require('socket.io').listen(server);
var socket = require('./socket.js');
io.sockets.on('connection', socket);

// app.listen(3000, function () {
// });

server.listen(3000, function() {
    console.log('Social Threat listening on port 3000!');
});
server.on('listening', onListening);

function onListening() {
    console.log('Listening on port ' + server.address().port);
}
