import Console from 'meta-console';
import io from 'socket.io-client';

String.prototype.deentitize = function() {
    var ret = this.replace(/&gt;/g, '>');
    ret = ret.replace(/&lt;/g, '<');
    ret = ret.replace(/&quot;/g, '"');
    ret = ret.replace(/&apos;/g, "'");
    ret = ret.replace(/&amp;/g, '&');
    return ret;
};

const socket = io.connect();

const code       = window.__CODE__!==undefined&&window.__CODE__.code!==undefined?window.__CODE__.code.deentitize():undefined;
const identifier = window.__CODE__!==undefined&&window.__CODE__._id!==undefined?window.__CODE__._id:undefined;

const _console = new Console({

  github: true,

  code: code,
  identifier: identifier

})

.on('compile', (code) => {

  socket.emit('set', code);

})
.on('clear', (identifier) => {

  // socket.emit('remove', _console.identifier);

  //Clear url
  history.pushState(null, null, '/');

});

socket.on('connect', (data) => {

 // console.log('[Socket] - Connected.');

 socket.on('identifier', (identifier) => {

    // console.log('[Socket] - Received identifier: '+identifier);

    //Add url
    history.pushState(null, null, identifier);

    _console.identifier = identifier;

 });

});
