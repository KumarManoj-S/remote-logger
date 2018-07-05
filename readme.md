# Central Logger
Central Logger is a tiny library for streaming the logs and info about the node application to the remote server. It is working using 'fire and forget' protocol.
## Install
Available via <a href="https://www.npmjs.com/" title="npm">npm</a>.
```
npm install central-logger
````
## Usage
Set up your remote central server :
```js
var Server = require('central-logger').Server;

//create the server
var server = new Server(
	'127.0.0.1', 		//host
    3500			//port
);

//set up the transport location
server.addTransports('/var/log/mydirectory/');

server.listen();

})
```

start the server,

```
node server.js
```

set up your client apps that sends the log or info to the remote server :
```js
const Client = require('central-logger').Client;

//category
const MODULE1 = 'module1';
const MODULE2 = 'module2';

//create the client logger
var logger = new Client('127.0.0.1', 3500);

```

Afterwards just log as usual:

```js
logger.log("info", "foo", MODULE1);
```
It will send the log to the central server. 
The syntax for the log method is ,
```js
log(level, message, category);
```

and then on your remote server you can check the logged files,
```js
cat /var/log/mydirectory/MODULE1.log

{"level":"info","message":"foo","timestamp":"2018-07-05T10:36:41.357Z"}
```
If you don't mention any category while logging it will log them into the deafult file <code>'error.log'</code>