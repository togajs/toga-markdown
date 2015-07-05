/*eslint-env mocha */

var formatter = require('../src/toga-markdown').formatter,
	Tunic = require('tunic'),
	expect = require('expect'),
	toga = require('toga'),
	join = require('path').join,
	readFileSync = require('fs').readFileSync,

	config = {
		fixtures: join(__dirname, 'fixtures'),
		expected: join(__dirname, 'expected'),
		actual: join(__dirname, 'actual')
	};

describe('toga-markdown e2e', function () {
	describe('object streams', function () {
		function testWithFile(filename, stream, done) {
			var fixture = join(config.fixtures, filename),
				expected = join(config.expected, filename + '.json');

			function expectFile(file) {
				var actual = JSON.stringify(file.ast, null, 2) + '\n';

				expect(actual).toEqual(String(readFileSync(expected)));
			}

			toga
				.src(fixture)
				.pipe(new Tunic())
				.pipe(stream)
				.on('data', expectFile)
				.on('error', done)
				.on('end', done);
		}

		it('should format samples', function (done) {
			testWithFile('match.js', formatter(), done);
		});

		it('should format samples', function (done) {
			testWithFile('nomatch.js', formatter(), done);
		});
	});
});
