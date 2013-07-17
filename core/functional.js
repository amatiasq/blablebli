// Possible strict violation
//jshint -W040

// Wrapper function arguments are not used
//jshint unused:false

define(function(require, exports) {
	'use strict';

	var toArray = require('lang/array').toArray;


	function wrapFunction(argCount, fn) {
		switch (argCount) {
		case 0:
			return function()            { return fn.apply(this, arguments) };
		case 1:
			return function(a)           { return fn.apply(this, arguments) };
		case 2:
			return function(a,b)         { return fn.apply(this, arguments) };
		case 3:
			return function(a,b,c)       { return fn.apply(this, arguments) };
		case 4:
			return function(a,b,c,d)     { return fn.apply(this, arguments) };
		case 5:
			return function(a,b,c,d,e)   { return fn.apply(this, arguments) };
		case 6:
			return function(a,b,c,d,e,f) { return fn.apply(this, arguments) };
		default:
			throw new Error('6+ arguments??? yo mad!?!?');
		}
	}

	function currify(fn, stack) {
		var currified = function() {
			var args = stack.concat(toArray(arguments));
			return args.length < fn.length ? currify(fn, args) : fn.apply(this, args);
		};

		if (curry.decorate)
			currified = wrapFunction(fn.length - stack.length, currified);

		currified.stack = stack;
		currified.exec = exec;

		return currified;
	}

	function exec() {
		this.apply(null, this.stack);
	}

	function curry(fn) {
		return currify(fn, []);
	}


	function compose() {
		var fns = toArray(arguments).reverse();
		var first = fns.shift();

		return function() {
			return fns.reduce(function(val, fn) {
				return fn(val);
			}, first.apply(null, arguments));
		};
	}


	function map(iterator, data) {
		if (typeof data.map === 'function')
			data.map(iterator);
		else
			console.error('No mappeable object', data);
	}


	function dot(prop, obj) {
		return obj[prop];
	}

	function invoke(args, fn) {
		return fn.apply(null, args);
	}

	function method(name, args, obj) {
		return obj[name].apply(obj, args);
	}


	exports.map = map;
	exports.compose = compose;
	exports.curry = curry;

	exports.dot = curry(dot);
	exports.invoke = curry(invoke);
	exports.method = curry(method);
});
