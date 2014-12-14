# Etcher

[![Build Status](https://travis-ci.org/justinhoward/etcher.svg?branch=master)](https://travis-ci.org/justinhoward/etcher)

A flexible logging library for javascript.

## Creating a Logger

To start logging, create a new `Etcher` object by passing a handler to
its constructor.

```javascript
var Etcher = require('etcher');
var ConsoleLogHandler = require('etcher').handler.ConsoleLogHandler;

var logger = new Etcher(new ConsoleLogHandler());
```

## Log Levels

Etcher uses the log levels dictated by [RFC 5424: The Syslog Protocol](http://tools.ietf.org/html/rfc5424).

 - `emergency`: system is unusable
 - `alert`: action must be taken immediately
 - `critical`: critical conditions
 - `error`: error conditions
 - `warning`: warning conditions
 - `notice`: normal but significant condition
 - `info`: informational messages
 - `debug`: debug-level messages

## Logging

There are several ways to create a log. There are methods for each log level as
well as a `log` method.

### Log Level Methods

The log level methods are a quick shortcut for creating a log with a specific log level. Each log level
method takes two arguments, and message and an optional log context object.

```javascript
logger.critical('something bad happened', {foo: 'relevant info'});
logger.alert('take immediate action!');
```

## The log Method

The log method allows passing a log level as an argument. This is useful for cases
where the log level is determined dynamically.

```javascript
logger.log('info', 'an informational message', {data: 'some useful data'});
```

## The Log Object

Internally, whenever a log method is called, Etcher creates a `Log` object which it passes to its
log handler. You can also create a `Log` object manually to pass to the `log` method.

The `Log` constructor takes 3 arguments: the log level, the log message, and an optional context;

```javascript
var notice = new Log('notice', 'an interesting thing happened', {foo: 'foo'});
logger.log(notice);
```

See `Log.js` for full documentation.

## Multiple Handlers

A single Etcher instance can have an unlimited number of log handlers by using a `ChainLogHandler`.
In this first case, all log handlers will be called every time a log is created.

```javascript
var logger = new Etcher(new Etcher.handler.ChainLogHandler([
    new Etcher.handler.ConsoleLogHandler(),
    new MyCustomHandler()
]));
```

The `ChainLogHandler` can take a second argument called `bubble`. If it is true, it will stop handling a
log as soon as it is handled successfully.

```javascript
var logger = new Etcher(new Etcher.handler.ChainLogHandler([
    new LogSometimesHandler(),
    new BackupHandler()
]), true);
```

In this case, the `LogSometimesHandler` will be called first, and it it fails, `BackupHandler` will be called.

## The Log Context

The last argument passed to the logging methods is the "context". This is just an object of information
related to the log. If the context is not a plain javascript object, it will be converted to an object with
a `value` property.

### Logging Error Objects

There are a couple shortcuts for logging errors. If an `Error` object is passed as the context,
it will be converted to a plain object with an `error` property. If an `Error` is passed as the message parameter,
the context `error` property will be set, and the message will be set to the error message string.

## Custom Handlers

Etcher is designed to be customizable. You can create your own custom log handlers by just
creating an object with a `boolean handle(Log log)` method. It should return true if the log was handled successfully,
and false if it was not handled.

```javascript
var alertHandler = {
    handle: function(log) {
        alert(log.getMessage());
        return true;
    }
};
```

You can also use a constructor function to create a more robust handler.

```javascript
function AlertHandler(alertFunction) {
    this._alertFunction = alertFunction;
}

AlertHandler.prototype.handle = function(log) {
    this._alertFunction(log.getMessage());
    return true;
};

var alertHandler = new AlertHandler(window.alert);
```