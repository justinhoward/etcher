'use strict';

/**
 * A Log with a level, message, context and attributes
 *
 * @param {string} level The log level. See `setLevel`.
 * @param {string} message The log message. See `setMessage`.
 * @param {object} context The log context. See `setContext`.
 */
function Log(level, message, context) {
    this._context = {};
    this._attributes = {};

    this.setContext(context);
    this.setMessage(message);
    this.setLevel(level);
}
var proto = Log.prototype;

/**
 * An array of the valid log levels from lowest to highest
 * @type {Array}
 */
Log.levels = ['debug', 'info', 'notice', 'warning', 'error', 'critical', 'alert', 'emergency'];

/**
 * An object whose keys are log levels, and values are the index 0 to 7 where 0 is the least important,
 * and 7 is the most important.
 * @type {object}
 */
Log.positions = Log.levels.reduce(function(accumulator, level, index) {
    accumulator[level] = index;
    return accumulator;
}, {});

/**
 * Compare two log level strings
 *
 * @param {string} levelA A log level
 * @param {string} levelB A log level
 * @return {integer} Positive if A>B, 0 if A=B, negative if B>A
 */
Log.compareLevels = function(levelA, levelB) {
    return Log.levels.indexOf(levelA) - Log.levels.indexOf(levelB);
};

/**
 * Check if a log level is at least another given level
 *
 * @param {string} minimumLevel The minimum level to check against
 * @param {string} level The level to check
 * @return {boolean} True if `level` is at least `minimumLevel`
 */
Log.isAtLeast = function(minimumLevel, level) {
    return Log.compareLevels(minimumLevel, level) <= 0;
};

/**
 * Get the log level
 * @return {string} The log level
 */
proto.getLevel = function() {
    return this._level;
};

/**
 * Set the log level
 * @param {string} level The level to set
 * @return {this}
 */
proto.setLevel = function(level) {
    if (!Log.positions.hasOwnProperty(level)) {
        throw new Error('invalid log level ' + level);
    }

    this._level = level;
    return this;
};

/**
 * Check if the level is at least the given minimum
 *
 * @param {string} minimum The minimum level to check against
 * @return {boolean} True if the log level is at least `minimum`
 */
proto.isAtLeast = function(minimum) {
    return Log.isAtLeast(minimum, this._level);
};

/**
 * Get the log message
 * @return {string} The log message
 */
proto.getMessage = function() {
    return this._message;
};

/**
 * Set the log message.
 *
 * If `message` is an Error instance, the message will be set to the error
 * message and the context parameter `error` will be set to the error object.
 *
 * @param {string|Error} message The log message
 * @return {this}
 */
proto.setMessage = function(message) {
    if (message instanceof Error) {
        this.set('error', message);
        message = message.message;
    }

    this._message = message || '';
    return this;
};

/**
 * Get a context parameter
 * @param {string} param The parameter name
 * @return {mixed} The parameter value, or undefined if not set.
 */
proto.get = function(param) {
    return this._context[param];
};

/**
 * Set a context parameter
 * @param {string} param The parameter name
 * @param {mixed} value The parameter value
 * @return {this}
 */
proto.set = function(param, value) {
    this._context[param] = value;
    return this;
};

/**
 * Set the log context
 *
 * If `context` is an Error instance, the error will be set on the `error`
 * property of the context.
 *
 * Otherwise, if `context` is not a plain object (string, constructor instance, etc.), it will be set on the
 * `value` property of the context.
 *
 * The given context parameters will be merged with the existing context, overwriting
 * any existing parameters with the same name.
 *
 * @param {object|Error|mixed} context The log context
 * @return {this}
 */
proto.setContext = function(context) {
    if (context instanceof Error) {
      context = {error: context};
    } else if ('' + context !== '[object Object]') {
        if (typeof context === 'undefined') {
            context = {};
        } else {
            context = {value: context};
        }
    }

    for (var param in context) {
        if (context.hasOwnProperty(param)) {
            this._context[param] = context[param];
        }
    }

    return this;
};

/**
 * Get the log context
 *
 * @return {object} The context object
 */
proto.getContext = function() {
    return this._context;
};

/**
 * Check if any context parameters are set
 *
 * @return {boolean} True if there are parameters set
 */
proto.hasContext = function() {
    for (var param in this._context) {
        if (this._context.hasOwnProperty(param)) {
            return true;
        }
    }
    return false;
};

/**
 * Get a log attribute
 *
 * @param {string} name The attribute name
 * @return {mixed} The attribute value
 */
proto.getAttribute = function(name) {
    return this._attributes[name];
};

/**
 * Set an attribute
 *
 * @see setAttributes
 * @param {string} name The attribute name
 * @param {mixed} value The attribute value
 * @return {this}
 */
proto.setAttribute = function(name, value) {
    this._attributes[name] = value;
    return this;
};

/**
 * Get the attributes object
 *
 * @see setAttributes
 * @return {object} The log attributes
 */
proto.getAttributes = function() {
    return this._attributes;
};

/**
 * Set attributes on the log
 *
 * Attributes are for internal use by Etcher and its log handlers and are not meant to
 * hold log context data. For example, attributes could be used to indicate that a log
 * was created by an HTTP library to prevent recursive HTTP logging.
 *
 * The given attributes will be merged with the existing attributes, overwriting
 * any existing attributes with the same name.
 *
 * @see setAttributes
 * @param {object} attributes The attributes to set
 * @return {this}
 */
proto.setAttributes = function(attributes) {
    for (var name in attributes) {
        if (attributes.hasOwnProperty(name)) {
            this._attributes[name] = attributes[name];
        }
    }
    return this;
};

module.exports = Log;
