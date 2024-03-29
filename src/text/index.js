'use strict';

var angular = require('angular');

var ngModule = angular.module('angular-utilities.text', [ ]);

ngModule.filter('capitalize', require('./capitalize-filter'));
ngModule.filter('ellipsis', require('./ellipsis-filter'));
ngModule.filter('semicolon', require('./semicolon-filter'));
ngModule.filter('toClassName', require('./to-class-name-filter'));

module.exports = ngModule.name;
