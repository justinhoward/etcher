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
        expect(Logger.isAtLeast('warning', 'error')).to.be.true();
        expect(Logger.isAtLeast('emergency', 'info')).to.be.false();
        expect(Logger.isAtLeast('critical', 'critical')).to.be.true();
    });

    it('can log something', function(done) {
        var context = {};
        var logger = new Logger({handle: function(log) {
            expect(log.level).to.equal('alert');
            expect(log.message).to.equal('test');
            expect(log.context).to.equal(context);
            done();
        }});

        logger.log('alert', 'test', context);
    });

    it('can log with the critical method', function(done) {
        var logger = new Logger({handle: function(log) {
            expect(log.level).to.equal('critical');
            expect(log.message).to.equal('test');
            expect(log.context).to.have.property('value', 'ctx');
            done();
        }});

        logger.critical('test', 'ctx');
    });

    it('can log with an error context', function(done) {
        var error = new Error();
        var logger = new Logger({handle: function(log) {
            expect(log.context).to.have.property('error', error);
            done();
        }});

        logger.warning('', error);
    });

    it('catches invalid levels', function() {
        var logger = new Logger({handle: function() {}});
        expect(function() {
            logger.log('asdf');
        }).to.Throw(Error);
    });
});