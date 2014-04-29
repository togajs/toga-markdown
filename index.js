'use strict';

/**
 * # Toga Markdown Formatter
 *
 * Walks a Toga abstract syntax tree, finds all descriptions, parses them as
 * Markdown, and replaces the values with the HTML output.
 */

var Transform = require('stream').Transform;
var inherits = require('mout/lang/inheritPrototype');
var marked = require('marked');
var mixIn = require('mout/object/mixIn');
var traverse = require('traverse');

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

var proto = inherits(TogaFormatterMarkdown, Transform);

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
    var options = this.options;
    var toga = file && file.toga;
    var ast = toga && toga.ast;

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
