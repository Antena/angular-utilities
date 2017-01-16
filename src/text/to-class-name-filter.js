'use strict';

/**
 * @ngdoc filter
 * @name angular-utilities.text.filter:toClassName
 * @kind function
 *
 * @description
 *   Converts a string into a valid className.
 *   Valid chars are '_', '-', a-z, A-Z, 0-9. First char cannot be 0-9 or '-'.
 *
 * @param {String} input Any string.
 * @param {String=} [prefix=''] An optional string to use as a prefix for the converted result
 * @param {String=} [replacement='_'] An optional string to use as a replcement for invalid characters.
 *
 * @returns {String} The transformed string.
 *
 *
 * @example
 <example module="angular-utilities.text">
 <file name="index.html">
 <p>Convert to valid className:
 <strong>{{ 'a.88%bb 9 $ asd' | toClassName }}</strong>
 </p>
 <p>Convert to className with prefix='sample--':
 <strong>{{ '99 red balloons' | toClassName:'sample--' }}</strong>
 </p>
 <p>Convert to className with replacement='_zz_':
 <strong>{{ '99 red balloons' | toClassName:'':'_zz_' }}</strong>
 </p>
 <p>Convert to className with replacement='-':
 <strong>{{ 'red balloons' | toClassName:'':'-' }}</strong>
 </p>
 <p>Convert to className with replacement='-' (valid replacement, except for 1st char):
 <strong>{{ '99 red balloons' | toClassName:'':'-' }}</strong>
 </p>
 </file>
 </example>
 *
 */

// @ngInject
module.exports = function() {

	var rx = /^[_a-zA-Z]+[_a-zA-Z0-9-]+$/;	//valid class names

	return function sanitizeCodeForClassName(input, prefix, replacement) {
		var result;
		prefix = prefix || '';
		if(prefix && !rx.test(prefix)) {
			throw new Error("Invalid prefix. String has to have valid chars for css className.");
		}

		replacement = replacement || '_';
		if(replacement && /[^_a-zA-Z0-9-]+$/.test(replacement)) {
			throw new Error("Invalid replacement. String has to have valid chars for css className.");
		}

		if(rx.test(input)) {
			result = input;
		} else {
			result = input.replace(/[^_A-Za-z0-9-]/g, replacement);

			if(!prefix && /^[0-9-]/.test(result.charAt(0))) {
				var validPrefix = /^[0-9-]/.test(replacement.charAt(0)) ? '_' : replacement;
				result = validPrefix + result;
			}
		}
		return result ? prefix + result : '';
	};
};
