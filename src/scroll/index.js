'use strict';

var angular = require('angular');

var ngModule = angular.module('angular-utilities.scroll', [
	require('../performance/index')
]);

ngModule.directive('isolateScrollingWhen', require('./isolate-scrolling-when-directive'));

module.exports = ngModule.name;
