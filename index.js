'use strict';

var logger = require('./src/Logger');
logger.handler = {
    console: require('./src/ConsoleLogHandler')
};

module.exports = logger;