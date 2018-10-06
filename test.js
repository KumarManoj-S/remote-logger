const assert = require('assert');
const Client = require('./client');

const host = '127.0.0.1';
const port = '3500';

describe('Client', function() {

    it('should create a new instance of Client', function() {
        const logger = new Client(host, port);
        assert.equal(logger.host, host);
        assert.equal(logger.port, port);
    });

});