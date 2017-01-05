'use strict';

require("webpack");

var config = {
	context: __dirname,
	entry: {
		'bundle': './test/test-app.js'
	},
	output: {
		path: "dist",
		filename: "bundle.js"
	},
	module: {
	},
	resolve: {
		modulesDirectories: ['.', 'node_modules']
	},
	plugins: [ ]
};

module.exports = config;
