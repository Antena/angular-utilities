'use strict';

/*jshint expr: true*/
describe('angular-utilities.text', function() {

	beforeEach(angular.mock.module('angular-utilities.text'));

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
			expect(_$filter_('semicolon')('Hello')).to.be.equal('Hello: ');
		});

		it("should add semicolon to multiple words", function() {
			expect(_$filter_('semicolon')('Hello World')).to.be.equal('Hello World: ');
		});
	});

	describe('toClassName filter', function() {
		it("should replace invalid characters", function() {
			expect(_$filter_('toClassName')('a.88%bb 9 $ asd')).to.be.equal('a_88_bb_9___asd');
		});

		it("should replace invalid characters, but keep valid", function() {
			expect(_$filter_('toClassName')('a.9-123')).to.be.equal('a_9-123');
		});

		it("should add prefix if provided", function() {
			expect(_$filter_('toClassName')('a.9', 'hello--')).to.be.equal('hello--a_9');
		});

		it("should use fail if prefix is invalid", function() {
			expect(function() {
				return _$filter_('toClassName')('a.9', '%');
			}).to.throw('Invalid prefix. String has to have valid chars for css className.');
		});

		it("should use provided replacement", function() {
			expect(_$filter_('toClassName')('a.9', '', '_z_')).to.be.equal('a_z_9');
			expect(_$filter_('toClassName')('9aaa.bbb', 'hello--', '-')).to.be.equal('hello--9aaa-bbb');
		});

		it("should use provided replacement, except for 1st char, if invalid", function() {
			expect(_$filter_('toClassName')('9aaa.bbb', '', '-')).to.be.equal('_9aaa-bbb');
		});

		it("should use fail if replacement is invalid", function() {
			expect(function() {
				return _$filter_('toClassName')('a.9', '', '%');
			}).to.throw('Invalid replacement. String has to have valid chars for css className.');
		});
	});
});
