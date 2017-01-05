'use strict';

// assign window.jQuery so that angular uses jquery
window.$ = window.jQuery = window.jquery = require('jquery');
var angular = require('angular');

var ngModule = angular.module('angular-utilities', [
	require('./misc/index'),
	require('./performance/index'),
	require('./scroll/index'),
	require('./text/index')
]);

module.exports = ngModule.name;
