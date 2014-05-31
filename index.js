'use strict';

/**
 * # Toga Markdown Formatter
 *
 * Walks a Toga abstract syntax tree, finds all descriptions, parses them as
 * Markdown, and replaces the values with the HTML output.
 */

var proto,
	Transform = require('stream').Transform,
	inherits = require('mout/lang/inheritPrototype'),
	marked = require('marked'),
	mixIn = require('mout/object/mixIn'),
	traverse = require('traverse');

/**
 * @class Tunic
 * @extends Transform
 *
 * @constructor
 * @param {Object} options
 */
function TogaFormatterMarkdown(options) {
	if (!(this instanceof TogaFormatterMarkdown)) {
		return new TogaFormatterMarkdown(options);
	}

	/**
	 * @property options
	 * @type {Object}
	 */
	this.options = mixIn({}, this.defaults, options);

	Transform.call(this, { objectMode: true });
}

proto = inherits(TogaFormatterMarkdown, Transform);

/**
 * Default options for `marked`.
 *
 * @property defaults
 * @type {Object}
 */
proto.defaults = {
	breaks: false,
	gfm: true,
	smartLists: true,
	smartypants: false,
	tables: true
};

/**
 * Transforms descriptions from Markdown to HTML.
 *
 * @method _transform
 * @param {String} file
 * @param {String} enc
 * @param {Function} cb
 */
proto._transform = function (file, enc, cb) {
	var options = this.options,
		toga = file && file.toga,
		ast = toga && toga.ast;

	if (!ast) {
		this.push(file);
		return cb();
	}

	traverse(ast).forEach(function (value) {
		if (this.key === 'description' && value) {
			this.update(marked(value, options));
		}
	});

	this.push(file);
	cb();
};

module.exports = TogaFormatterMarkdown;
