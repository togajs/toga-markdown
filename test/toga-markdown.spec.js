'use strict';

var md = require('../index'),
	expect = require('expect.js');

describe('toga-markdown spec', function () {
	describe('formatter', function () {
		it('should return a transform stream', function () {
			var retval = md.formatter();

			expect(retval.pipe).to.be.a(Function);
			expect(retval.readable).to.be(true);
			expect(retval.writable).to.be(true);
		});
	});
});
