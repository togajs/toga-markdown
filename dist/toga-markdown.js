'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.formatter = formatter;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * # Toga Markdown
 *
 * Walks a Toga abstract syntax tree, finds all descriptions, parses them as
 * Markdown, and replaces the values with the HTML output.
 *
 * @title Toga Markdown
 * @name toga-markdown
 */

var _trifle = require('trifle');

var _trifle2 = _interopRequireDefault(_trifle);

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

var _mtilObjectMixin = require('mtil/object/mixin');

var _mtilObjectMixin2 = _interopRequireDefault(_mtilObjectMixin);

var formatterDefaults = {
	name: 'toga-markdown',
	breaks: false,
	gfm: true,
	smartLists: true,
	smartypants: false,
	tables: true
};

function formatter(options) {
	options = _mtilObjectMixin2['default']({}, formatterDefaults, options);

	options.formatters = [{
		key: 'description',
		format: function format(value) {
			return _marked2['default'](value, options);
		}
	}];

	return new _trifle2['default'](options);
}