'use strict';

/**
 * @ngdoc filter
 * @name angular-utilities.misc.filter:trusted
 * @kind function
 *
 * @description
 *   Allows you to register html strings as trusted (so that angular allows rendering it) on the fly.
 *
 * @param {String} text An html string.
 *
 * @returns {String} The same html text.
 *
 */

// @ngInject
module.exports = function($sce) {
	return function(text) {
		return $sce.trustAsHtml(text);
	};
};
