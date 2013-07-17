'use strict';

var fn = require('core/functional');


function setProp(prop, descriptor, object) {
	return Object.defineProperty(object, prop, descriptor);
}

function setAllProps(descriptors, object) {
	return Object.defineProperties(object, descriptors);
}

function getOwnProp(prop, object) {
	return Object.getOwnPropertyDescriptor(object, prop);
}

function getProp(prop, object) {
	var descriptor;
	while (object) {
		descriptor = getOwnProp(prop, object);
		if (descriptor) return descriptor;
		object = Object.getPrototypeOf(object);
	}
	return null;
}

function getAllProps(object) {
	var protos = getPrototypeChain(object).reverse();
	var source = {};

	protos.forEach(function(prototype) {
		Object.keys(prototype).forEach(function(key) {
			source[key] = prototype;
		});
	});

	return simpleMap(getOwnProp, source);
}


function prototype(object) {
	return Object.create(object);
}

function create(descriptors) {
	return Object.create(Object.prototype, descriptors);
}

function inject(props, object) {
	var descriptors = getAllProps(props);
	setAllProps(descriptors, object);
	return object;
}

function extend(parent, props) {
	var child = prototype(parent);
	inject(props, child);
	return child;
}

function getPrototypeChain(object) {
	var protos = [object];
	while (object) {
		protos.push(object);
		object = Object.getPrototypeOf(object);
	}
	return protos;
}


function each(iterator, object) {
	Object.keys(object).forEach(function(key) {
		var descriptor = getProp(object, key);
		iterator(key, descriptor, object);
	});
}

function map(iterator, object) {
	var properties = {};

	each(function(key, descriptor) {
		properties[key] = iterator(key, descriptor, object);
	}, object);

	return create(properties);
}

function simpleEach(iterator, object) {
	Object.keys(object).forEach(function(key) {
		iterator(key, object[key], object);
	});
}

function simpleMap(iterator, object) {
	var result = {};
	simpleEach(function(key, value) {
		result[key] = iterator(key, value, object);
	}, object);
	return result;
}


exports.setProp = fn.curry(setProp);
exports.setAllProps = fn.curry(setAllProps);

exports.getOwnProp = fn.curry(getOwnProp);
exports.getProp = fn.curry(getProp);
exports.getAllProps = getAllProps;

exports.prototype = prototype;
exports.getPrototypeChain = getPrototypeChain;
exports.create = create;
exports.inject = fn.curry(inject);
exports.extend = fn.curry(extend);

exports.each = fn.curry(each);
exports.map = fn.curry(map);

exports.simpleEach = fn.curry(simpleEach);
exports.simpleMap = fn.curry(simpleMap);
