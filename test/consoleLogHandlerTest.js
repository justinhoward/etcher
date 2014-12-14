'use strict';

var expect = require('chai').expect;
var ConsoleLogHandler = require('../src/ConsoleLogHandler');
var Log = require('../src/Log');

describe('ConsoleLogHandler', function() {
    it('can log an alert as an error with no context', function(done) {
        var log = new Log('alert', 'test');
        var console = {
            error: function(message, context) {
                expect(message).to.equal('[ALERT] test');
                expect(arguments.length).to.equal(1);
                done();
            }
        };

        var handler = new ConsoleLogHandler('warning');
        handler.setConsole(console);
        handler.handle(log);
    });

    it('can log a warning with context', function(done) {
        var ctx = {foo: 'hi'};
        var log = new Log('warning', 'test', ctx);
        var console = {
            warn: function(message, context) {
                expect(message).to.equal('[WARNING] test');
                expect(context).to.deep.equal(ctx);
                done();
            }
        };

        var handler = new ConsoleLogHandler('warning');
        handler.setConsole(console);
        handler.handle(log);
    });

    it('can log a debug', function(done) {
        var log = new Log('debug', 'test');
        var console = {
            info: function(message, context) {
                expect(message).to.equal('[DEBUG] test');
                done();
            }
        };

        var handler = new ConsoleLogHandler('debug');
        handler.setConsole(console);
        handler.handle(log);
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
        handler.handle(new Log('debug'));
        expect(called).to.be.false();
    });
});