'use strict';

var etcher = require('./src/Etcher');
etcher.handler = {
    ConsoleLogHandler: require('./src/ConsoleLogHandler'),
    ChainLogHandler: require('./src/ChainLogHandler')
};
etcher.Log = require('./src/Log');

module.exports = etcher;