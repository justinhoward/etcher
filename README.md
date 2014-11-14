# Etcher

[![Build Status](https://travis-ci.org/justinhoward/etcher.svg?branch=master)](https://travis-ci.org/justinhoward/etcher)

A flexible logging library for javascript.

```js
var etcher = require('etcher');

// create a handler with the minimum level of error
var handler = new etcher.ConsoleLogHandler('error');
var logger = new etcher.Logger();

logger.warning('something bad happened', {some: 'data'}); // this will be logged
logger.info('somthing interesting happened'); //this won't be logged
```
