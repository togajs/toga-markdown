'use strict';

var TogaFormatterMarkdown = require('../index'),
	es = require('event-stream'),
	expect = require('expect.js'),
	vs = require('vinyl-fs');

describe('TogaFormatterMarkdown', function () {
	var formatter = TogaFormatterMarkdown;

	it('should create an instance when invoked directly', function () {
		var f = formatter();
		expect(f instanceof TogaFormatterMarkdown).to.be(true);
	});

	it('should create an instance when called with `new`', function () {
		var f = new TogaFormatterMarkdown();
		expect(f instanceof TogaFormatterMarkdown).to.be(true);
	});

	describe('prototype', function () {
		describe('_transform', function () {
			var toAst = function (file, cb) {
					var ast = JSON.parse(file.contents.toString());
					file.toga = { ast: ast };
					cb(null, file);
				},

				toEqualExpected = function (file, cb) {
					var expected = file.path.replace('fixtures', 'expected');
					expect(file.toga.ast).to.eql(require(expected));
					cb(null, file);
				},

				toEqualUndefined = function (file, cb) {
					expect(file.toga).to.be(undefined);
					cb(null, file);
				};

			it('should parse files with an ast', function (done) {
				vs.src(__dirname + '/fixtures/**/*.json')
					.pipe(es.map(toAst))
					.pipe(formatter())
					.pipe(es.map(toEqualExpected))
					.on('end', done);
			});

			it('should not parse files without an ast', function (done) {
				es.readArray([{ path: 'foo.js' }, { path: 'foo.js', content: null }])
					.pipe(formatter())
					.pipe(es.map(toEqualUndefined))
					.on('end', done);
			});
		});
	});
});
