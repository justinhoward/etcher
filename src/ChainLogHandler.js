'use strict';

function ChainLogHandler(handlers, bubble) {
    this._handlers = handlers;
    this._bubble = bubble !== false;
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