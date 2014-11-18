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

proto.handle = function(level, message, context) {
    if (!this._console || !Logger.isAtLeast(this._level, level)) {
        return false;
    }

    var args = ['[' + level.toUpperCase() + '] ' + message];
    if (typeof context !== 'undefined') {
        args[1] = context;
    }

    if (Logger.isAtLeast('error', level)) {
        this._console.error.apply(this._console, args);
    } else if (Logger.isAtLeast('warning', level)) {
        this._console.warn.apply(this._console, args);
    } else {
        this._console.info.apply(this._console, args);
    }

    return true;
};

module.exports = ConsoleLogHandler;