'use strict';

var webpackConfig = require('./webpack.config.js');
webpackConfig.entry = {};

module.exports = function(config) {
	config.set({
		basePath: '',
		frameworks: ['mocha', 'chai'],

		reporters: ['progress'],
		port: 9876,
		colors: false,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ['PhantomJS', 'Chrome'],
		singleRun: true,
		autoWatchBatchDelay: 300,

		files: [
			'./test/test-app.js',
			'./test/**/*.spec.js'],

		preprocessors: {
			'./test/test-app.js': ['webpack']
		},

		webpack: webpackConfig,

		webpackMiddleware: {
			noInfo: true
		}
	});
};
