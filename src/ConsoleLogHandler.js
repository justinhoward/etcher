'use strict';

var Log = require('./Log');

/**
 * Logs to the global console log
 *
 * @param {string} level The minimum level to log
 */
function ConsoleLogHandler(level) {
    this._level = level;
    this._console = global.console;
}
var proto = ConsoleLogHandler.prototype;

/**
 * Set the console object. By default this is the global
 * console, but this can override it.
 *
 * @param {console} console A substitute console object
 */
proto.setConsole = function(console) {
    this._console = console;
};

proto.handle = function(log) {
    if (!this._console || !log.isAtLeast(this._level)) {
        return false;
    }

    var args = ['[' + log.getLevel().toUpperCase() + '] ' + log.getMessage()];
    if (log.hasContext()) {
        args[1] = log.getContext();
    }

    if (log.isAtLeast('error')) {
        this._console.error.apply(this._console, args);
    } else if (log.isAtLeast('warning')) {
        this._console.warn.apply(this._console, args);
    } else {
        this._console.info.apply(this._console, args);
    }

    return true;
};

module.exports = ConsoleLogHandler;