'use strict';

var expect = require('chai').expect;
var index = require('../index');
var Etcher = require('../src/Etcher');
var Log = require('../src/Log');
var ChainLogHandler = require('../src/ChainLogHandler');
var ConsoleLogHandler = require('../src/ConsoleLogHandler');

describe('index', function() {
    it('is the etcher constructor', function() {
        expect(index).to.equal(Etcher);
    });

    it('has handlers', function() {
        expect(index.handler.ChainLogHandler).to.equal(ChainLogHandler);
        expect(index.handler.ConsoleLogHandler).to.equal(ConsoleLogHandler);
    });

    it('has the log constructor', function() {
        expect(index.Log).to.equal(Log);
    });
});