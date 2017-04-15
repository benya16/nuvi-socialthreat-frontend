/**
 * Created by bjami on 14/04/2017.
 */
var express = require('express');
var app = express();

app.get('*', function (req, res) {
    console.log('/mnt/c/Users/bjami/Documents/Big Data/nuvi-socialthreat-frontend/app/index.html');
    res.sendFile('/mnt/c/Users/bjami/Documents/Big Data/nuvi-socialthreat-frontend/app/index.html');
});

app.listen(3000, function () {
    console.log('Social Threat listening on port 3000!');
});