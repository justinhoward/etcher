'use strict';

var logger = require('./src/Logger');
logger.handler = {
    console: require('./src/ConsoleLogHandler'),
    chain: require('./src/ChainLogHandler')
};

module.exports = logger;