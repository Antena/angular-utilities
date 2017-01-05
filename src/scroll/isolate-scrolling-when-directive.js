'use strict';

/**
 * @ngdoc directive
 * @name angular-utilities.scroll.directive:isolateScrollingWhen
 * @restrict A
 * @scope
 *
 * @description
 *
 * Isolates the scrolling event within this directive's element on a given condition.
 * This can be used to avoid scroll events from reaching the $document.
 *
 * @element ANY
 *
 * @param {String|Function} isolateScrollingWhen Angular expression to watch for. When this expression evaluates
 * to truthy, the scroll event will be isolated within this directive's element. When it evaluates to falsy,
 * the default event bubbling is restored.
 *
 * <div id="fixedTree" class="lab-tree" isolate-scrolling-when="treeIsFixed">
 *
 * @example
 <example module="isolate-scrolling-example">
 <file name="index.html">

 <div example-directive class="example">

 	 <h2>How to test:</h2>
 	 <h4>Scroll within the yellow box. Keep scrolling after reaching end/beginning of content. Don't move mouse outside the box.</h4>
 	 <h4>Expected behaviour:</h4>
     <ul>
 		<li>When checkbox is <strong>unchecked</strong>, after end/beginning of content is reached, the main window will start scrolling.</li>
 		<li>When checkbox is <strong>checked</strong>, after end/beginning of content is reached, the main window never scroll.</li>
  	 </ul>

 	 <div class="form-inline demo-controls">
 		<label>
 			<input type="checkbox" ng-model="vm.doIsolate" class="form-control">
 			Enable scrolling isolation for the container below
 		</label>
		 <label>
			Scroll events received by window:
 			<input type="text" ng-model="vm.documentScrollCount" readonly class="form-control">
		 </label>
 	 </div>

	 <div class="demo-container" isolate-scrolling-when="vm.doIsolate">
 		<p>
		 Hodor! Hodor hodor, hodor hodor hodor. Hodor hodor - hodor, hodor. Hodor hodor, hodor, hodor hodor. Hodor hodor HODOR! Hodor hodor hodor. Hodor. Hodor hodor HODOR! Hodor hodor; hodor hodor?!
 		 Hodor hodor HODOR! Hodor HODOR hodor, hodor hodor hodor hodor - hodor. Hodor, hodor. Hodor. Hodor, HODOR hodor, hodor HODOR hodor, hodor hodor hodor... Hodor hodor hodor?

		 Hodor, hodor. Hodor. Hodor, hodor... Hodor hodor hodor... Hodor hodor hodor. Hodor. Hodor! Hodor hodor, hodor hodor?! Hodor hodor - HODOR hodor, hodor hodor; hodor hodor; hodor hodor?! Hodor. Hodor hodor...
   		 Hodor hodor hodor; hodor hodor, hodor. Hodor hodor, hodor, hodor hodor. Hodor hodor HODOR! Hodor hodor hodor hodor hodor hodor!

		 Hodor! Hodor hodor, hodor hodor hodor?! Hodor, hodor. Hodor. Hodor, HODOR hodor, hodor hodor; hodor hodor, hodor, hodor hodor. Hodor hodor - HODOR hodor, hodor hodor hodor hodor. Hodor HODOR hodor,
 		 hodor hodor; hodor hodor, hodor, hodor hodor. Hodor hodor HODOR! Hodor hodor... Hodor hodor hodor. Hodor hodor - hodor, hodor. Hodor HODOR hodor, hodor hodor? Hodor, hodor. Hodor. Hodor, hodor... Hodor hodor hodor -
 		 hodor; hodor hodor. Hodor! Hodor hodor, hodor hodor, hodor. Hodor hodor... Hodor hodor hodor hodor hodor. Hodor. Hodor hodor... Hodor hodor hodor, hodor. Hodor hodor... Hodor hodor hodor?!
 		</p>
 	 </div>


 </div>

 </file>
 <file name="main.css">

 .demo-container {
		max-height: 250px;
		background-color: #FFF492;
		border: 1px solid #FFF057;
		padding: 10px;
		overflow-y: scroll;
	}

 .demo-controls {
		background-color: #D5F5FF;
		border: 1px solid #BFE3FF;
		padding: 10px;
		margin-bottom: 20px;
	}

 </file>
 <file name="styles.css">

 .example .value-within-range-card .bad {
			color: #C0334E;
		}
 .example .value-within-range-card .good {
			color: #00b752;
		}

 </file>
 <file name="demo.js">

 angular.module('isolate-scrolling-example', ['angular-utilities.scroll'])
 .directive('exampleDirective', [function() {
        return {
			restrict: 'A',
			link: function ($scope) {
					$scope.vm = {
						documentScrollCount: 0,
						doIsolate: false
					};

					$(window).scroll(function() {
						$scope.$apply(function() {
							$scope.vm.documentScrollCount++;
						});
					});
			}
		};
	}]);

 </file>
 </example>
 *
 */

var _ = require('underscore');

// @ngInject
module.exports = function($timeout, WatchUtilities) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {

			var fallbackBehaviour = function (e) {
				var result = true;

				if (e.detail > 0 && this.clientHeight + this.scrollTop == this.scrollHeight) {
					this.scrollTop = this.scrollHeight - this.clientHeight;
					e.stopPropagation();
					e.preventDefault();
					result = false;
				}
				else if (e.detail < 0 && this.scrollTop <= 0) {
					this.scrollTop = 0;
					e.stopPropagation();
					e.preventDefault();
					result = false;
				}

				return result;
			};

			var mainBehaviour = function (e) {
				var result = true;

				var deltaY = _.isUndefined(e.deltaY) ? e.originalEvent.deltaY : e.deltaY;
				if (deltaY > 0 && this.clientHeight + this.scrollTop >= this.scrollHeight) {
					this.scrollTop = this.scrollHeight - this.clientHeight;
					e.stopPropagation();
					e.preventDefault();
					result = false;
				}
				else if (deltaY < 0 && this.scrollTop <= 0) {
					this.scrollTop = 0;
					e.stopPropagation();
					e.preventDefault();
					result = false;
				}

				return result;
			};

			WatchUtilities.watchIndependently(scope, attrs.isolateScrollingWhen, function(value) {
				if (value) {
					$timeout(function() {
						element.bind('mousewheel', mainBehaviour);
						element.bind('DOMMouseScroll', fallbackBehaviour); 	//IE
					}, 0, false);
				} else {
					element.unbind('mousewheel', mainBehaviour);
					element.unbind('DOMMouseScroll', fallbackBehaviour);
				}
			});
		}
	};
};
