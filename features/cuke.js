var pop = Function.prototype.call.bind(Array.prototype.pop);

function sync(fn) {
	return function() {
		fn.apply(this, arguments);
		pop(arguments)();
	};
}

function wrap(fn) {
	return function(pattern, step) {
		fn.call(this, pattern, sync(step));
	};
}

function cuke(module, fn) {
	module.exports = function() {
		this.Given = wrap(this.Given);
		this.When = wrap(this.When);
		this.Then = wrap(this.Then);
		return fn.apply(this, arguments);
	};
}

module.exports = cuke;
