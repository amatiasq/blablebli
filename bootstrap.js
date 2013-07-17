requirejs.config({

	paths: {
		'underscore': 'bower_components/lodash/lodash',
		'lang/object': 'lang/object.ecma5',
	}

});

requirejs(['main']);
