'use strict';

/**
 * @ngdoc filter
 * @name angular-utils.text.filter:ellipsis
 * @kind function
 *
 * @description
 *   Appends an ellipsis to the given string.
 *
 * @param {String} input Any string.
 *
 * @returns {String} The transformed string.
 *
 *
 * @example
 <example module="angular-utils.text">
 <file name="index.html">
 <p>Adds an ellipsis:
 <strong>{{ 'The quick brown fox jumps over the lazy dog' | ellipsis }}</strong>
 </p>
 </file>
 </example>
 *
 */

// @ngInject
module.exports = function() {

	return function(input) {
		return input + '...';
	};
};
