import path from 'path';
import express from 'express';
import http from 'http';

import _Database from './Database';
import Document from './Document';

const Database = new _Database();

const app = express();

var server = require('http').createServer(app);
var io     = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/:identifier', (req,res) => {

  const identifier = req.params.identifier;

  if(identifier){

    console.log('[app] - /'+identifier);

    Database.get(identifier, (code) => {

      res.writeHead(200, {'Content-Type': 'text/html'});

      res.write(new Document({code:code}).get());

      res.end();

    });

  }

});

app.get('/', (req,res) => {

  res.writeHead(200, {'Content-Type': 'text/html'});

  res.write(new Document().get());

  res.end();

})

server.listen(5000, "0.0.0.0").listen(5000, () => {
  console.log(`[SERVER] - Listening on port 5000!`);
});

io.sockets.on('connection', (socket) => {

  console.log(`[SOCKET] - Socket connected (${socket.id})`);

  socket.on('code', (code) => {

    console.log(`[SOCKET] - Received code: (${JSON.stringify(code)})`);

    Database.set(code, (identifier) => {

      //Send identifier back
      socket.emit('identifier', identifier);

    });

  });

});
