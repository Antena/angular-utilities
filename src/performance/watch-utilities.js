'use strict';

/**
 * @ngdoc service
 * @name angular-utilities.performance.factory:WatchUtilities
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
		 * @methodOf angular-utilities.performance.factory:WatchUtilities
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
		 *  WatchUtilities.watchIndependently(scope, attrs.onCondition, function(value) {
		 *  	// value changed!
		 *  	// no digest cycle was harmed in the making of this demo ;)
		 *  });
		 * ```
		 */
		watchIndependently: function watchIndependently(scope, watchExpression, listener) {

			var previous = INITIAL_VALUE,		// use a constant for invoking the handler the first time (with value === oldValue).
				expr = $parse(watchExpression);	// pre-parse the expression for better performance

			return scope.$watch(function() {
				var value = expr(scope);

				if (value !== previous) {
					listener(value, (previous === INITIAL_VALUE) ? value : previous, scope);
					previous = value;
				}
			});
		}
	};
};
