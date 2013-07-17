define(function(require, exports) {
	'use strict';

	exports.toArray = Function.prototype.call.bind(Array.prototype.slice);

});
