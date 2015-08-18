'use strict';

var expect = require('chai').expect;
var Log = require('../src/Log');

describe('Log', function() {
    it('can be constructed', function() {
        var ctx = {foo: 'foo val'};
        var log = new Log('info', 'hi', ctx);
        expect(log.getLevel()).to.equal('info');
        expect(log.getMessage()).to.equal('hi');
        expect(log.getContext()).to.deep.equal(ctx);
    });

    it('can set the level', function() {
        var log = new Log('info');
        log.setLevel('emergency');
        expect(log.getLevel()).to.equal('emergency');
    });

    it('can get and set context parameters', function() {
        var log = new Log('info');
        log.set('foo', 'foo val');
        expect(log.get('foo')).to.equal('foo val');
    });

    it('can get and set individual attributes', function() {
        var log = new Log('info');
        log.setAttribute('foo', 'foo val');
        expect(log.getAttribute('foo')).to.equal('foo val');
    });

    it('can get and set the message', function() {
        var log = new Log('info');
        log.setMessage('hi');
        expect(log.getMessage()).to.equal('hi');
    });

    it('can set the message to an error', function() {
        var error = new Error('a message');
        var log = new Log('error', error);
        expect(log.getMessage()).to.equal('a message');
        expect(log.get('error')).to.equal(error);
    });

    it('can set the context to an error', function() {
        var error = new Error();
        var log = new Log('info', '', error);
        expect(log.get('error')).to.equal(error);
    });

    it('can set the context to a string', function() {
        var log = new Log('info', '', 'ctx');
        expect(log.get('value')).to.equal('ctx');
    });

    it('can set the context to an object', function() {
        var log = new Log('info');
        var ctx = {foo: 'foo val'};
        log.setContext(ctx);
        expect(log.getContext()).to.deep.equal(ctx);
    });

    it('can check if it has a context', function() {
        var log = new Log('info');
        expect(log.hasContext()).to.be.false();
        log.set('foo', 'foo val');
        expect(log.hasContext()).to.be.true();
    });

    it('can check if it has a context when Object prototype is extended', function() {
        Object.prototype.foo = 1234;
        var log = new Log('info');
        expect(log.hasContext()).to.be.false();
        log.set('foo', 'foo val');
        expect(log.hasContext()).to.be.true();
        delete Object.prototype.foo;
    });

    it('sets context by merging with existing', function() {
        var log = new Log('info', '', {foo: 'foo orig', bar: 'bar orig'});
        log.setContext({bar: 'bar new'});
        expect(log.get('foo')).to.equal('foo orig');
        expect(log.get('bar')).to.equal('bar new');
    });

    it('only sets context own properties', function() {
        var log = new Log('info');
        var Ctor = function() {};
        Ctor.prototype = {foo: 1234};
        log.setContext(new Ctor());
        expect(log.getContext().foo).to.equal(undefined);
    });

    it('can set attributes to an object', function() {
        var log = new Log('info');
        log.setAttributes({foo: 'foo orig', bar: 'bar orig'});
        expect(log.getAttribute('bar')).to.equal('bar orig');
        log.setAttributes({bar: 'bar new'});
        expect(log.getAttribute('foo')).to.equal('foo orig');
        expect(log.getAttribute('bar')).to.equal('bar new');
    });

    it('only sets attributes own properties', function() {
        var log = new Log('info');
        var Ctor = function() {};
        Ctor.prototype = {foo: 1234};
        log.setAttributes(new Ctor());
        expect(log.getAttribute('foo')).to.equal(undefined);
    });

    it('can get all attributes', function() {
        var log = new Log('info');
        log.setAttribute('foo', 1234);
        expect(log.getAttributes()).to.deep.equal({foo: 1234});
    });

    it('has levels', function() {
        expect(Log.levels[0]).to.equal('debug');
        expect(Log.levels[7]).to.equal('emergency');
    });

    it('has level positions', function() {
        expect(Log.positions.emergency).to.equal(7);
        expect(Log.positions.info).to.equal(1);
    });

    it('can compare two levels', function() {
        expect(Log.compareLevels('info', 'alert')).to.be.lessThan(0);
        expect(Log.compareLevels('error', 'warning')).to.be.greaterThan(0);
        expect(Log.compareLevels('alert', 'alert')).to.equal(0);
        expect(Log.levels.slice().sort(Log.compareLevels)).to.deep.equal(Log.levels);
    });

    it('can say if a level is at least a minimum', function() {
        expect(Log.isAtLeast('warning', 'error')).to.be.true();
        expect(Log.isAtLeast('emergency', 'info')).to.be.false();
        expect(Log.isAtLeast('critical', 'critical')).to.be.true();
    });

    it('can say if a log has a minimum level', function() {
        var error = new Log('warning');
        var info = new Log('info');
        var critical = new Log('critical');
        expect(error.isAtLeast('warning')).to.be.true();
        expect(info.isAtLeast('emergency')).to.be.false();
        expect(critical.isAtLeast('critical')).to.be.true();
    });

    it('catches invalid levels', function() {
        expect(function() {
            new Log('foo');
        }).to.Throw(Error);
    });
});
