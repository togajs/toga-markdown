/*eslint-env mocha */

var formatter = require('../src/toga-markdown').formatter,
	expect = require('expect');

describe('toga-markdown spec', function () {
	describe('formatter', function () {
		it('should return a transform stream', function () {
			var retval = formatter();

			expect(retval.pipe).toBeA(Function);
			expect(retval.readable).toBe(true);
			expect(retval.writable).toBe(true);
		});
	});
});
