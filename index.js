'use strict';

/**
 * # Toga Markdown Formatter
 *
 * Walks a Toga abstract syntax tree, finds all descriptions, parses them as
 * Markdown, and replaces the values with the HTML output.
 */

var through = require('through2'),
	marked = require('marked'),
	mixin = require('mtil/object/mixin'),
	traverse = require('traverse'),

	/**
	 * Default options.
	 */
	defaults = {
		keys: ['description'],
		breaks: false,
		gfm: true,
		smartLists: true,
		smartypants: false,
		tables: true
	};

exports.formatter = function (options) {
	options = mixin({}, defaults, options);

	var keys = options.keys;

	function format(value) {
		// jshint validthis: true
		if (keys.indexOf(this.key) > -1 && value) {
			this.update(marked(value, options));
		}
	}

	function walk(file, enc, cb) {
		var ast = file && file.ast;

		if (ast) {
			traverse(ast).forEach(format);
		}

		cb(null, file);
	}

	return through.obj(walk);
};
