'use strict';

var expect = require('chai').expect;
var ConsoleLogHandler = require('../src/ConsoleLogHandler');

describe('ConsoleLogHandler', function() {
    it('can log an alert as an error', function(done) {
        var args;
        var console = {
            error: function(message, context) {
                expect(message).to.equal('[ALERT] test');
                expect(context).to.equal('ctx');
                done();
            }
        };

        var handler = new ConsoleLogHandler('warning');
        handler.setConsole(console);
        handler.handle({level: 'alert', message: 'test', context: 'ctx'});
    });

    it('can log a warning', function(done) {
        var args;
        var console = {
            warn: function(message, context) {
                expect(message).to.equal('[WARNING] test');
                expect(context).to.equal('ctx');
                done();
            }
        };

        var handler = new ConsoleLogHandler('warning');
        handler.setConsole(console);
        handler.handle({level: 'warning', message: 'test', context: 'ctx'});
    });

    it('can log a debug', function(done) {
        var args;
        var console = {
            info: function(message, context) {
                expect(message).to.equal('[DEBUG] test');
                expect(context).to.equal('ctx');
                done();
            }
        };

        var handler = new ConsoleLogHandler('debug');
        handler.setConsole(console);
        handler.handle({level: 'debug', message: 'test', context: 'ctx'});
    });

    it('does not log if level is too low', function() {
        var called = false;
        var console = {
            info: function(message, context) {
                called = true;
            }
        };

        var handler = new ConsoleLogHandler('warning');
        handler.setConsole(console);
        handler.handle({level: 'debug', message: 'test', context: {}});
        expect(called).to.be.false();
    });
});