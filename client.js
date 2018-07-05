var dgram = require('dgram');
var client = dgram.createSocket('udp4');

function Client(serverHost,port){
    this.host = serverHost;
    this.port = port;
}

function makeLogObject(level, message, category){
    var log = {
        'level' : level,
        'message' : message,
        'category' : category,
        'timestamp' : new Date()
    }
    return log;
}

Client.prototype.log = function(level, message, category){
    var log = makeLogObject(level, message, category);
    const msg = Buffer.from(JSON.stringify(log));
    client.send(msg, 0, msg.length, this.port, this.host);
}

module.exports = Client;
