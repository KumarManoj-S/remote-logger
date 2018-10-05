var expect = require('chai').expect;
var request = require('request');
let port = require('./server');

it('Server Works Fine',function(done){
    request(`http://localhost:${port.port}/`,function(err,response,body){
        expect(body).to.equal('Hello World');
        done();
    })
})
