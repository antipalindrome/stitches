/**
 * # layout/horizontal
 *
 * Constructor for the horizontal canvas layout manager
 *
 * > http://draeton.github.com/stitches<br/>
 * > Copyright 2013, Matthew Cobbs<br/>
 * > Licensed under the MIT license.
 */
/*global require, define */

define([
    "jquery",
    "util/util",
    "layout/base"
],
function ($, util, BaseLayout) {

    "use strict";

    /**
     * ## HorizontalLayout
     *
     * Create a new `HorizontalLayout` instance
     *
     * @constructor
     * @param {object} options
     */
    var HorizontalLayout = function (options) {};

    util.inherit(HorizontalLayout, BaseLayout, {
        /**
         * ### HorizontalLayout.prototype.getDimensions
         * ...
         */
        getDimensions: function (sprites, defaults) {
            var width = 0;
            var height = 0;

            $.map(sprites, function (sprite) {
                height = sprite.height > height ? sprite.height : height;
                width += sprite.width;
            });

            return {
                width: width || defaults.width,
                height: height || defaults.height
            };
        },

        /**
         * ### HorizontalLayout.prototype.getDimensions
         * ...
         */
        placeSprite: function (sprite, placed, dimensions) {
            var intersection;
            var tries = 0;
            var x;
            var y = 0;

            while (tries < 2) {
                for (x = 0; x <= dimensions.width - sprite.width; x++) {
                    sprite.x = x;
                    sprite.y = y;

                    intersection = this.intersection(sprite, placed);

                    if (!intersection) {
                        placed.push(sprite);
                        sprite.show();
                        return true;
                    }

                    x = intersection.x + intersection.width - 1;
                }

                dimensions.width += sprite.width;
                dimensions.height += sprite.height;
                tries++;
            }

            return false;
        }
    });

    return HorizontalLayout;

});
