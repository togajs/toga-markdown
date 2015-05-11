/**
 * # Toga Markdown
 *
 * Walks a Toga abstract syntax tree, finds all descriptions, parses them as
 * Markdown, and replaces the values with the HTML output.
 *
 * @title Toga Markdown
 * @name toga-markdown
 */

import Trifle from 'trifle';
import marked from 'marked';
import mixin from 'mtil/object/mixin';

var formatterDefaults = {
	name: 'toga-markdown',
	breaks: false,
	gfm: true,
	smartLists: true,
	smartypants: false,
	tables: true
};

export function formatter(options) {
	options = mixin({}, formatterDefaults, options);

	var formatters = options.formatters || (
		options.formatters = []
	);

	formatters.push(function (node, value) {
		if (node.key === 'description' && value != null) {
			node.update(marked(value, options));
		}
	});

	return new Trifle(options);
}
