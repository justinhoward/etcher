'use strict';

var expect = require('chai').expect;
var Logger = require('../src/Logger');

describe('Logger', function() {
    it('has levels', function() {
        expect(Logger.levels[0]).to.equal('debug');
        expect(Logger.levels[7]).to.equal('emergency');
    });

    it('has level positions', function() {
        expect(Logger.positions.emergency).to.equal(7);
        expect(Logger.positions.info).to.equal(1);
    });

    it('can compare two levels', function() {
        expect(Logger.compare('info', 'alert')).to.be.lessThan(0);
        expect(Logger.compare('error', 'warning')).to.be.greaterThan(0);
        expect(Logger.compare('alert', 'alert')).to.equal(0);
        expect(Logger.levels.slice().sort(Logger.compare)).to.deep.equal(Logger.levels);
    });

    it('can say if a level is at least a minimum', function() {
        expect(Logger.isAtLeast('warning', 'error')).to.equal(true);
        expect(Logger.isAtLeast('emergency', 'info')).to.equal(false);
        expect(Logger.isAtLeast('critical', 'critical')).to.equal(true);
    });

    it('can log something', function(done) {
        var logger = new Logger({handle: function(level, message, context) {
            expect(level).to.equal('alert');
            expect(message).to.equal('test');
            expect(context).to.equal('ctx');
            done();
        }});

        logger.log('alert', 'test', 'ctx');
    });

    it('can log with the critical method', function(done) {
        var logger = new Logger({handle: function(level, message, context) {
            expect(level).to.equal('critical');
            expect(message).to.equal('test');
            expect(context).to.equal('ctx');
            done();
        }});

        logger.critical('test', 'ctx');
    });
});