/**
 * # Toga Markdown
 *
 * Walks a Toga abstract syntax tree, finds all descriptions, parses them as
 * Markdown, and replaces the values with the HTML output.
 *
 * @title Toga Markdown
 * @name toga-markdown
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.formatter = formatter;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _trifle = require('trifle');

var _trifle2 = _interopRequireDefault(_trifle);

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

var formatterDefaults = {
	name: 'toga-markdown',
	breaks: false,
	gfm: true,
	smartLists: true,
	smartypants: false,
	tables: true
};

function formatter(options) {
	options = _extends({}, formatterDefaults, options);

	function updateDescription(node, value) {
		if (node.key === 'description' && value != null) {
			node.update((0, _marked2['default'])(value, options));
		}
	}

	return new _trifle2['default'](options).add(updateDescription);
}