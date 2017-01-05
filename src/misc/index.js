'use strict';

var angular = require('angular');

var ngModule = angular.module('angular-utilities.misc', [ ]);

ngModule.filter('trusted', require('./trusted-filter'));

module.exports = ngModule.name;
