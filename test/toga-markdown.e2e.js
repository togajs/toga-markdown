/*eslint-env mocha */

import { formatter } from '../src/toga-markdown';
import Tunic from 'tunic';
import expect from 'expect';
import vinylFs from 'vinyl-fs';
import { join } from 'path';
import { readFileSync } from 'fs';

var config = {
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

			vinylFs
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
