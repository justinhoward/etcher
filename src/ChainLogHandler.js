'use strict';

/**
 * A composite log handler that can distribute
 * logs to multiple child log handlers
 *
 * @param {array[handler]} handlers An array of child handlers
 * @param {boolean} [bubble] Default: false. If true, handling will stop after
 *     the log is handled successfully.
 */
function ChainLogHandler(handlers, bubble) {
    this._handlers = handlers;
    this._bubble = !!bubble;
}
var proto = ChainLogHandler.prototype;

proto.handle = function(log) {
    var i = 0, iLen = this._handlers.length, handled;
    for (; i < iLen; i++) {
        if (this._handlers[i].handle(log)) {
            handled = true;
            if (this._bubble) {
                break;
            }
        }
    }

    return handled;
};

module.exports = ChainLogHandler;