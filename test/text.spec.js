'use strict';

/*jshint expr: true*/
describe('angular-utils.text', function() {

	beforeEach(angular.mock.module('angular-utils.text'));

	var _$filter_;

	beforeEach(angular.mock.inject(function($filter) {

		_$filter_ = $filter;

	}));

	describe('capitalize filter', function() {

		it("should capitalize single word", function() {
			var expected = 'Hello';
			expect(_$filter_('capitalize')('hello')).to.be.equal(expected);
			expect(_$filter_('capitalize')('HELLO')).to.be.equal(expected);
			expect(_$filter_('capitalize')('Hello')).to.be.equal(expected);
		});

		it("should capitalize multiple words if requested", function() {
			var expected = 'Hello World';
			expect(_$filter_('capitalize')('hello world', true)).to.be.equal(expected);
			expect(_$filter_('capitalize')('HELLO WORLD', true)).to.be.equal(expected);
			expect(_$filter_('capitalize')('Hello World', true)).to.be.equal(expected);
			expect(_$filter_('capitalize')('HELLO world', true)).to.be.equal(expected);
			expect(_$filter_('capitalize')('hello WORLD', true)).to.be.equal(expected);
		});

		it("should NOT capitalize multiple words if not requested", function() {
			expect(_$filter_('capitalize')('hello world')).to.be.equal('Hello world');
			expect(_$filter_('capitalize')('HELLO WORLD')).to.be.equal('Hello WORLD');
			expect(_$filter_('capitalize')('Hello World')).to.be.equal('Hello World');
			expect(_$filter_('capitalize')('HELLO world')).to.be.equal('Hello world');
			expect(_$filter_('capitalize')('hello WORLD')).to.be.equal('Hello WORLD');
		});
	});

	describe('ellipsis filter', function() {

		it("should add ellipsis to single word", function() {
			expect(_$filter_('ellipsis')('Hello')).to.be.equal('Hello...');
		});

		it("should add ellipsis to multiple words", function() {
			expect(_$filter_('ellipsis')('Hello World')).to.be.equal('Hello World...');
		});
	});

	describe('semicolon filter', function() {

		it("should add semicolon to single word", function() {
			expect(_$filter_('semicolon')('Hello')).to.be.equal('Hello:');
		});

		it("should add semicolon to multiple words", function() {
			expect(_$filter_('semicolon')('Hello World')).to.be.equal('Hello World:');
		});
	});
});
