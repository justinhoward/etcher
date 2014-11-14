# Chronicler

[![Build Status](https://travis-ci.org/justinhoward/chronicler.svg?branch=master)](https://travis-ci.org/justinhoward/chronicler)

A flexible logging library for javascript.

```js
var chronicler = require('chronicler');

// create a handler with the minimum level of error
var handler = new chronicler.ConsoleLogHandler('error');
var logger = new chronicler.Logger();

logger.warning('something bad happened', {some: 'data'}); // this will be logged
logger.info('somthing interesting happened'); //this won't be logged
```
