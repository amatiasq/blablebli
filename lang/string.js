'use strict';

var fn = require('core/functional');


function repeat(text, count) {
	return Array(count + 1).join(text);
}


exports.repeat = fn.curry(repeat);
