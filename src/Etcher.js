'use strict';
var Log = require('./Log');

/**
 * The Etcher logger
 *
 * @param {handler} handler The log handler
 */
function Etcher(handler) {
    this._handler = handler;
}
var proto = Etcher.prototype;

/**
 * Handle a given log
 *
 * @param {Log|string} log A Log object to handle. If a string, the log level.
 * @param {string} message If the first argument is a string, the log message.
 * @param {object} context If the first argument is a string, the log context.
 * @return {this}
 */
proto.log = function(log) {
    if (typeof log === 'string') {
        log = this.createLog(log, arguments[1], arguments[2]);
    }

    this._handler.handle(log);
    return this;
};

/**
 * Create a Log object
 *
 * @param {string} level A log level
 * @param {string} message The log message
 * @param {object} context The log context
 * @return {Log} The created Log
 */
proto.createLog = function(level, message, context) {
    return new Log(level, message, context);
};

/**
 * System is unusable
 *
 * @method emergency
 * @param {string} message
 * @param {object} context
 * @return {this}
 */

/**
 * Critical conditions. Action must be taken immediately.
 *
 * Example: Entire website down, database unavailable, etc. This should
 * trigger the SMS alerts and wake you up.
 *
 * @method alert
 * @param {string} message
 * @param {object} context
 * @return {this}
 */

/**
 * Critical conditions
 *
 * Example: Application component unavailable, unexpected exception
 *
 * @method critical
 * @param {string} message
 * @param {object} context
 * @return {this}
 */

/**
 * Runtime errors that do not require immediate action but should typically
 * be logged and monitored
 *
 * @method error
 * @param {string} message
 * @param {object} context
 * @return {this}
 */

/**
 * Exceptional occurrences that are not errors
 *
 * @method warning
 * @param {string} message
 * @param {object} context
 * @return {this}
 */

/**
 * Normal but significant events
 *
 * @method notice
 * @param {string} message
 * @param {object} context
 * @return {this}
 */

/**
 * Interesting events
 *
 * @method info
 * @param {string} message
 * @param {object} context
 * @return {this}
 */

/**
 * Detailed debug information
 *
 * @method debug
 * @param {string} message
 * @param {object} context
 * @return {this}
 */

Log.levels.forEach(function(level) {
    proto[level] = function(message, context) {
        return this.log(level, message, context);
    };
});

module.exports = Etcher;