'use strict';
var Log = require('./Log');

function Etcher(handler) {
    this._handler = handler;
}
var proto = Etcher.prototype;

proto.log = function(log) {
    if (typeof log === 'string') {
        log = new Log(log, arguments[1], arguments[2]);
    }

    this._handler.handle(log);
};

Log.levels.forEach(function(level) {
    proto[level] = function(message, context) {
        this.log(level, message, context);
    };
});

module.exports = Etcher;