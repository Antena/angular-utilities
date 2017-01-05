'use strict';

var angular = require('angular');

var ngModule = angular.module('angular-utils.performance', [ ]);

ngModule.factory('AngularUtilities', require('./angular-utilities'));

module.exports = ngModule.name;
