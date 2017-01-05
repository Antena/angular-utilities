'use strict';

var angular = require('angular');

var ngModule = angular.module('angular-utilities.performance', [ ]);

ngModule.factory('WatchUtilities', require('./watch-utilities'));

module.exports = ngModule.name;
