import path from 'path';
import express from 'express';
import http from 'http';
import _io from 'socket.io';

import _Database from './Database';
import Document from './Document';

const Database = new _Database();

const app = express();
const server = http.createServer(app);
const io = _io(server);


app.get('/:identifier', (req,res) => {

  const identifier = req.params.identifier;

  if(identifier){

    console.log('[app] - /'+identifier);

    Database.select(identifier, (code) => {

      res.writeHead(200, {'Content-Type': 'text/html'});

      res.write(new Document({code:code}).get());

      res.end();

    });

  }

});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {

  res.writeHead(200, {'Content-Type': 'text/html'});

  res.write(new Document().get());

  res.end();

});

server.listen(5000, "0.0.0.0").listen(5000, () => {
  console.log(`[Server] - Listening on port 5000!`);
});

io.sockets.on('connection', (socket) => {

  console.log(`[Socket] - Socket connected (${socket.id})`);

  socket.on('set', (code) => {

    console.log(`[Socket] - Received code: (${JSON.stringify(code)})`);

    Database.insert(code, (identifier) => {

      //Send identifier back
      socket.emit('identifier', identifier);

    });

  });

  socket.on('remove', (identifier) => {

    console.log(`[Socket] - Remove identifier: (${identifier})`);

      Database.remove(identifier, (result) => {


    });

  });

});
