var template = require('../../templates/palettes/downloads.hbs');

var PaletteView = require('./palette');

/**
 * @return {View}
 */
module.exports = PaletteView.extend({

	/**
	 * @type {Objetc}
	 */
	events: {
		'click [data-action=close]': 'onClickClose'
	},

	/**
	 * Set up instance properties and call startup methods
	 */
	initialize: function () {
		console.info('palettes : downloads : initialize()');

		// prepare in dom
		this.render();
	},

	/**
	 * Create the html for the view and append to the element.
	 *
	 * @return {View}
	 */
	render: function () {
		console.info('palettes : downloads : render()');

		var html = template();

		this.$el.empty().append(html);

		return this;
	},

	/**
	 * Close me
	 *
	 * @param {Event} e
	 */
	onClickClose: function () {
		console.info('palettes : downloads : onClickClose()');

		this.close();
	}

});