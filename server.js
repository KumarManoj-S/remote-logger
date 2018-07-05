const dgram = require('dgram');
var fs = require('fs');
var mkdirp = require('mkdirp');
const DEFAULT_FILENAME = "errors.log";
const socket = dgram.createSocket('udp4');

function Server(host, port){
    this.host = host;
    this.port = port;
}

Server.prototype.addTransports = function(directory){
    const lastCharacter = directory.charAt(directory.length - 1);
    this.directory = directory;
    if(lastCharacter !== '/')  
        this.directory = this.directory + "/";
    mkdirp(this.directory, function (err) {
        if (err) console.error(err);
        else console.log("Transports have been created!");
    });
}

function writeLog(message, directory, filename = DEFAULT_FILENAME){
    fs.appendFile( directory + filename, message, function (err) {
        if(err) console.log("error" + err);
    });
}

function makeLog(log){
    const level = log['level'];
    const message = log['message'];
    const timestamp = log['timestamp'];
    return JSON.stringify({
        "level" : level,
        "message" : message,
        "timestamp" : timestamp
    }) + "\n";
}

function createLogFileFromCategory(category){
    const filename = category + ".log";
    return filename;
}

Server.prototype.listen = function(){
    socket.on('message', (msg, rinfo) => {
        msgJSON = JSON.parse(msg.toString('utf8'));
        const log = makeLog(msgJSON);
        if(msgJSON.hasOwnProperty('category')){
            const filename = createLogFileFromCategory(msgJSON['category']);
            writeLog(log, this.directory, filename);
        }else{
            writeLog(log, this.directory);
        }
    });

    socket.on('listening', () => {
        const address = socket.address();
        console.log(`Listening on port ${address.port}`);
    });

    socket.bind({
        address: this.host,
        port: this.port 
    });
}

module.exports = Server;
