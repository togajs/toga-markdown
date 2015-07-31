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

var formatterDefaults = {
	breaks: false,
	gfm: true,
	smartLists: true,
	smartypants: false,
	tables: true
};

export function formatter(options) {
	options = {
		...formatterDefaults,
		...options
	};

	function updateDescription(node, value) {
		if (node.key === 'description' && value != null) {
			node.update(marked(value, options));
		}
	}

	return new Trifle(options)
		.add(updateDescription);
}
