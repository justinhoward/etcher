'use strict';

var expect = require('chai').expect;
var Logger = require('../src/Logger');

describe('Logger', function() {
    it('can log something', function(done) {
        var context = {};
        var logger = new Logger({handle: function(log) {
            expect(log.getLevel()).to.equal('alert');
            expect(log.getMessage()).to.equal('test');
            expect(log.getContext()).to.equal(context);
            done();
        }});

        logger.log('alert', 'test', context);
    });

    it('can log with the critical method', function(done) {
        var logger = new Logger({handle: function(log) {
            expect(log.getLevel()).to.equal('critical');
            expect(log.getMessage()).to.equal('test');
            expect(log.get('foo')).to.equal('foo val');
            done();
        }});

        logger.critical('test', {foo: 'foo val'});
    });
});