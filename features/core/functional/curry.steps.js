var assert = require('assert');
var sinon = require('sinon');
var curry = require('../../../core/functional').curry;

require('../../cuke')(module, function() {

	function wrap(fn, count) {
		var args = Array(1 + parseInt(count, 10)).join('_').split('').join(',');
		var code = '(function(' + args + ') { return fn.apply(this, arguments); })';
		return eval(code);
	}

	var sut;
	var spy;

	this.Given(/^I create a function than recive (\d+) arguments?$/, function(count) {
		count = parseInt(count, 10);
		spy = sinon.spy();
		sut = wrap(spy, count);
	});

	this.Given(/^I curry it$/, function() {
		sut = curry(sut);
	});

	this.When(/^I invoke it with (\d+) arguments?$/, function(count) {
		count = parseInt(count, 10);
		var args = Array(count + 1).join('_').split('');
		sut.apply(null, args);
	});

	this.Then(/^It should be invoked once$/, function() {
		assert(spy.calledOnce);
	});

	this.Then(/^It should not be invoked$/, function() {
		assert(!spy.called);
	});
});
