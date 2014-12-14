'use strict';

var etcher = require('./src/Etcher');
etcher.handler = {
    console: require('./src/ConsoleLogHandler'),
    chain: require('./src/ChainLogHandler')
};
etcher.log = require('./src/Log');

module.exports = etcher;