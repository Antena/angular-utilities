'use strict';

/**
 * @ngdoc service
 * @name angular-utils.performance.factory:AngularUtilities
 * @kind function
 *
 * @description
 *   Collection of utilitary functions to help with angular performance issues.
 *
 */

// @ngInject
module.exports = function($parse) {

	var INITIAL_VALUE = {};

	return {

		/**
		 * @ngdoc function
		 * @name watchIndependently
		 * @methodOf angular-utils.performance.factory:AngularUtilities
		 * @description
		 *
		 * Registers a listener callback to be executed whenever the watchExpression changes, but without
		 * triggering a new {@link https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$digest $digest} cycle.
		 * This should only be used for operations that should not trigger other watchers.
		 *
		 * @param {Scope} scope The scope to watch on.
		 * @param {String|Function} watchExpression Angular expression to watch for.
		 * @param {Function(newVal, oldVal, scope)} listener Function to execute when the expression changes.
		 *
		 * @returns {Function} unwatch function, that when invoked will deregister the watcher.
		 *
		 * @example
		 *
		 * ```js
		 *  AngularUtilities.watchIndependently(scope, attrs.onCondition, function(value) {
		 *  	// value changed, and no digest cycle was harmed during the making of function ;)
		 *  });
		 * ```
		 */
		watchIndependently: function watchIndependently(scope, watchExpression, listener) {

			// use a constant for invoking the handler the first time (with value === oldValue).
			var previous = INITIAL_VALUE,
				// pre-parse the expression for better performance
				expr = $parse(watchExpression);

			return scope.$watch(function() {
				var value = expr(scope);

				if (value !== previous) {
					listener(value, (previous === INITIAL_VALUE) ? value : previous, scope);
					previous = value;
				}
				// always return undefined
			});
		}
	};
};
