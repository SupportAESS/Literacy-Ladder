const express = require('express');
const server = express();
const https = require('https');
const http  = require('http');

server.get('/', (req, res) =>{
    res.send("Hello shivendra");
})

/*https.createServer(options, server).listen(443, function(req, res){
    console.log('HTTPS listening on 443');
});*/

http.createServer(server).listen(8080, function(req, res){
    console.log('HTTPS listening on 8080');
});


