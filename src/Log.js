'use strict';

function Log(level, message, context) {
    this._context = {};
    this._attributes = {};

    this.setContext(context);
    this.setMessage(message);
    this.setLevel(level);
}
var proto = Log.prototype;

Log.levels = ['debug', 'info', 'notice', 'warning', 'error', 'critical', 'alert', 'emergency'];
Log.positions = Log.levels.reduce(function(accumulator, level, index) {
    accumulator[level] = index;
    return accumulator;
}, {});

Log.compareLevels = function(levelA, levelB) {
    return Log.levels.indexOf(levelA) - Log.levels.indexOf(levelB);
};

Log.isAtLeast = function(minimumLevel, level) {
    return Log.compareLevels(minimumLevel, level) <= 0;
};

proto.getLevel = function() {
    return this._level;
};

proto.setLevel = function(level) {
    if (!Log.positions.hasOwnProperty(level)) {
        throw new Error('invalid log level ' + level);
    }

    this._level = level;
};

proto.isAtLeast = function(minimum) {
    return Log.isAtLeast(minimum, this._level);
};

proto.getMessage = function() {
    return this._message;
};

proto.setMessage = function(message) {
    if (message instanceof Error) {
        this.set('error', message);
        message = message.message;
    }

    this._message = message || '';
    return this;
};

proto.get = function(param) {
    return this._context[param];
};

proto.set = function(param, value) {
    this._context[param] = value;
    return this;
};

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

proto.getContext = function() {
    return this._context;
};

proto.hasContext = function() {
    for (var param in this._context) {
        if (this._context.hasOwnProperty(param)) {
            return true;
        }
    }
    return false;
};

proto.getAttribute = function(name) {
    return this._attributes[name];
};

proto.setAttribute = function(name, value) {
    this._attributes[name] = value;
    return this;
};

proto.getAttributes = function() {
    return this._attributes;
};

proto.setAttributes = function(attributes) {
    attributes = attributes || {};
    for (var name in attributes) {
        if (attributes.hasOwnProperty(name)) {
            this._attributes[name] = attributes[name];
        }
    }
};

module.exports = Log;