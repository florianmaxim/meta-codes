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

socket.on('connect', (data) => {

 console.log('[Socket] - Connected.');

 socket.on('identifier', (identifier) => {

    console.log('[Socket] - Received identifier: '+identifier);
    //Add identifier to url
    history.pushState(null, null, identifier);

 });

});

const code = window.__CODE__!==undefined&&window.__CODE__.code!==undefined?window.__CODE__.code.deentitize():undefined;

new Console({code:code})
  .on('compile', (code) => {
    socket.emit('code', code);
  });
