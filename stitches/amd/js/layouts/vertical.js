// Copyright 2013, Matthew Cobbs

// Licensed under the MIT license.

define(["jquery","util/util","layouts/base"],function(f,g,h){var d=function(){};g.inherit(d,h,{getDimensions:function(a,e){var c=0,b=0;f.map(a,function(a){c=a.width>c?a.width:c;b+=a.height});return{width:c||e.width,height:b||e.height}},placeSprite:function(a,e,c){for(var b,d=0;2>d;){for(b=0;b<=c.height-a.height;b++){a.x=0;a.y=b;b=this.intersection(a,e);if(!b)return e.push(a),a.show(),!0;b=b.y+b.height-1}c.width+=a.width;c.height+=a.height;d++}return!1}});return d});