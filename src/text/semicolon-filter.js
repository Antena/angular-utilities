'use strict';

/**
 * @ngdoc filter
 * @name angular-utilities.text.filter:semicolon
 * @kind function
 *
 * @description
 *   Adds a semicolon and a space at the end of the given string.
 *
 *   This filter is mostly useful for translations. This way you can have your translatable strings be as generic as
 *   possible, and then add puntuation via filters.
 *
 * @param {String} input Any string.
 *
 * @returns {String} The transformed string.
 *
 *
 * @example
 <example module="angular-utilities.text">
 <file name="index.html">
 <p>{{ 'The quick brown fox jumps over the lazy dog' | semicolon }}</p>
 </file>
 </example>
 *
 */

// @ngInject
module.exports = function() {
	return function(input) {
		return input + ': ';
	};
};
