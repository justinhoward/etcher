'use strict';

var expect = require('chai').expect;
var ChainLogHandler = require('../src/ChainLogHandler');

describe('ChainLogHandler', function() {
    it('calls handlers until the log is handled', function() {
        var a = false, b = false, c = false;
        var handlers = [
            {handle: function() {
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
        var handler = new ChainLogHandler(handlers);
        handler.handle({level: 'warning', message: 'test', context: 'ctx'});

        expect(a).to.be.true();
        expect(b).to.be.true();
        expect(c).to.be.false();
    });

    it('calls all handlers with bubbling off', function() {
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
        var handler = new ChainLogHandler(handlers, false);
        handler.handle({level: 'warning', message: 'test', context: 'ctx'});

        expect(a).to.be.true();
        expect(b).to.be.true();
    });
});