'use strict';

var expect = require('chai').expect;
var ChainLogHandler = require('../src/ChainLogHandler');
var Log = require('../src/Log');

describe('ChainLogHandler', function() {
    it('calls all handlers', function() {
        var a = false, b = false;
        var handlers = [
            {handle: function() {
                a = true;
                return true;
            }},
            {handle: function() {
                b = true;
            }}
        ];
        var handler = new ChainLogHandler(handlers);
        handler.handle(new Log('warning'));

        expect(a).to.be.true();
        expect(b).to.be.true();
    });

    it('calls handlers until the log is handled with bubbling on', function() {
        var a = false, b = false, c = false;
        var log = new Log('info');
        var handlers = [
            {handle: function(log) {
                expect(log).to.equal(log);
                a = true;
                return false;
            }},
            {handle: function() {
                b = true;
                return true;
            }},
            {handle: function() {
                c = true;
            }}
        ];
        var handler = new ChainLogHandler(handlers, true);
        handler.handle(log);

        expect(a).to.be.true();
        expect(b).to.be.true();
        expect(c).to.be.false();
    });
});