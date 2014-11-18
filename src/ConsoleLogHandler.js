'use strict';

var Logger = require('./Logger');

function ConsoleLogHandler(level) {
    this._level = level;
    this._console = global.console;
}
var proto = ConsoleLogHandler.prototype;

proto.setConsole = function(console) {
    this._console = console;
};

proto.handle = function(log) {
    if (!this._console || !Logger.isAtLeast(this._level, log.level)) {
        return false;
    }

    var args = ['[' + log.level.toUpperCase() + '] ' + log.message];
    if (typeof log.context !== 'undefined') {
        args[1] = log.context;
    }

    if (Logger.isAtLeast('error', log.level)) {
        this._console.error.apply(this._console, args);
    } else if (Logger.isAtLeast('warning', log.level)) {
        this._console.warn.apply(this._console, args);
    } else {
        this._console.info.apply(this._console, args);
    }

    return true;
};

module.exports = ConsoleLogHandler;