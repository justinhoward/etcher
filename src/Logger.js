'use strict';

function Logger(handler) {
    this._handler = handler;
}
var proto = Logger.prototype;
Logger.levels = ['debug', 'info', 'notice', 'warning', 'error', 'critical', 'alert', 'emergency'];
Logger.positions = Logger.levels.reduce(function(accumulator, level, index) {
    accumulator[level] = index;
    return accumulator;
}, {});

Logger.compare = function(levelA, levelB) {
    return Logger.levels.indexOf(levelA) - Logger.levels.indexOf(levelB);
};

Logger.isAtLeast = function(minimumLevel, level) {
    return Logger.compare(minimumLevel, level) <= 0;
};

proto.log = function(level, message, context) {
    if (context instanceof Error) {
      context = {error: context};
    } else if ('' + context !== '[object Object]') {
        context = {value: context};
    }

    this._handler.handle({
        level: level,
        message: message,
        context: context
    });
};

Logger.levels.forEach(function(level) {
    proto[level] = function(message, context) {
        this.log(level, message, context);
    };
});

module.exports = Logger;