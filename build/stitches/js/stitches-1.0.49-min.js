define("jquery",[],function(){return jQuery;});define("modernizr",[],function(){return Modernizr;});define("util/util",["jquery"],function(e){return{proxy:function(d,h){"string"===typeof h&&(h=h.split(" "));e.map(h,function(c){d[c]=e.proxy(d[c],d);});},inherit:function(d,h,c){d.prototype=new h;d.prototype.constructor=h;e.each(c,function(b,a){d.prototype[b]=a;});d.prototype._super=function(b,a,g){return h.prototype[b].apply(a,g);};},removeValue:function(d,h){return e(d).filter(function(){return this!==h;});},debounce:function(d,e,c){var b;return function(){var a=this,g=arguments;b?window.clearTimeout(b):c&&d.apply(a,g);b=setTimeout(function(){c||d.apply(a,g);b=null;},e||50);};},cleanName:function(d){d=d.replace(/\.[a-z]{3,4}$/i,"");return d=d.replace(/[\s.]+/gi,"-").replace(/[^a-z0-9\-]/gi,"_");}};});define("layout/base",["jquery"],function(e){var d=function(){};d.prototype={constructor:d,getDimensions:function(){},placeSprites:function(){},intersection:function(d,c){var b,a,g,f,i=[],k;e.map(c,function(c){b=c.x<d.x+d.width;a=c.x+c.width>d.x;g=c.y<d.y+d.height;f=c.y+c.height>d.y;b&&(a&&g&&f)&&i.push(c);});i.length&&(k=i.pop());return k;}};return d;});define("layout/compact",["jquery","util/util","layout/base"],function(e,d,h){var c=function(){};d.inherit(c,h,{getDimensions:function(b,a){var g=0,f=0,d=0,c=0;e.map(b,function(a){g=a.width>g?a.width:g;f=a.height>f?a.height:f;d+=a.area;});c=Math.ceil(Math.sqrt(d));g=g>c?g:c;f=f>c?f:c;return{width:g||a.width,height:f||a.height};},placeSprite:function(b,a,g){for(var f,c=0,d,e;2>c;){for(e=0;e<=g.height-b.height;e++){for(d=0;d<=g.width-b.width;d++){b.x=d;b.y=e;f=this.intersection(b,a);if(!f){return a.push(b),b.show(),!0;}d=f.x+f.width-1;}e=f.y+f.height-1;}g.width+=b.width;g.height+=b.height;c++;}return !1;}});return c;});define("layout/vertical",["jquery","util/util","layout/base"],function(e,d,h){var c=function(){};d.inherit(c,h,{getDimensions:function(b,a){var g=0,f=0;e.map(b,function(a){g=a.width>g?a.width:g;f+=a.height;});return{width:g||a.width,height:f||a.height};},placeSprite:function(b,a,g){for(var f,d=0;2>d;){for(f=0;f<=g.height-b.height;f++){b.x=0;b.y=f;f=this.intersection(b,a);if(!f){return a.push(b),b.show(),!0;}f=f.y+f.height-1;}g.width+=b.width;g.height+=b.height;d++;}return !1;}});return c;});define("layout/horizontal",["jquery","util/util","layout/base"],function(e,d,h){var c=function(){};d.inherit(c,h,{getDimensions:function(b,a){var g=0,f=0;e.map(b,function(a){f=a.height>f?a.height:f;g+=a.width;});return{width:g||a.width,height:f||a.height};},placeSprite:function(b,a,g){for(var f,d=0;2>d;){for(f=0;f<=g.width-b.width;f++){b.x=f;b.y=0;f=this.intersection(b,a);if(!f){return a.push(b),b.show(),!0;}f=f.x+f.width-1;}g.width+=b.width;g.height+=b.height;d++;}return !1;}});return c;});define("util/stitches",["jquery","layout/compact","layout/vertical","layout/horizontal"],function(e,d,h,c){var b={compact:d,vertical:h,horizontal:c};return{setLayout:function(a){this.layout=new (b[a]||b.compact);},getDimensions:function(a,b){return this.layout.getDimensions(a,b);},placeSprites:function(a,b,f,d){var c=this;d(0,"info");e.map(a,function(e){e.placed||(e.placed=c.layout.placeSprite(e,b,f));d(b.length/a.length);});a=e.map(a,function(a){return a.placed?null:a;});},trim:function(a,b){var f=0,d=0;e.map(a,function(a){f=f>a.x+a.width?f:a.x+a.width;d=d>a.y+a.height?d:a.y+a.height;});b.width=f||b.width;b.height=d||b.height;},makeSpritesheet:function(a,b){var f,d,c;f=document.createElement("canvas");f.width=b.width;f.height=b.height;try{d=f.getContext("2d"),e.map(a,function(a){d.drawImage(a.image,a.x+a.padding,a.y+a.padding);}),c=f.toDataURL("image/png");}catch(h){this.$element.trigger("error",[h]);}return c;},makeStylesheet:function(a,b,f,d){b=d?b:"download.png";a=a.sort(function(a,b){return a.name<b.name?-1:1;});var c=["."+f+" {","    background: url("+b+") no-repeat;","}\n"];e.map(a,function(a){c=c.concat(["."+f+"-"+a.name+" {","    width: "+a.image.width+"px;","    height: "+a.image.height+"px;","    background-position: -"+a.x+"px -"+a.y+"px;","}\n"]);});return"data:text/plain,"+encodeURIComponent(c.join("\n"));},dataToObjectURL:function(a){var b=a.split(",");a=0<=b[0].indexOf("base64")?atob(b[1]):decodeURIComponent(b[1]);var b=b[0].split(":")[1].split(";")[0],f=a.length,d=new ArrayBuffer(f),c=new Uint8Array(d),e;for(e=0;e<f;e++){c[e]=a.charCodeAt(e);}a=this.createBlob(d,b);return this.createObjectURL(a);},createBlob:function(a,b){var f=window.BlobBuilder||window.WebKitBlobBuilder;if(!f){throw Error("BlobBuilder is unsupported.");}f=new f;f.append(a);return f.getBlob(b);},createObjectURL:function(a){if(window.URL&&window.URL.createObjectURL){return window.URL.createObjectURL(a);}if(window.webkitURL&&window.webkitURL.createObjectURL){return window.webkitURL.createObjectURL(a);}throw Error("createObjectURL is unsupported.");}};});define("text",["module"],function(e){var d,h,c,b,a=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],g=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,f=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,i="undefined"!==typeof location&&location.href,k=i&&location.protocol&&location.protocol.replace(/\:/,""),l=i&&location.hostname,n=i&&(location.port||void 0),m=[],j=e.config&&e.config()||{};d={version:"2.0.5+",strip:function(a){if(a){a=a.replace(g,"");var b=a.match(f);b&&(a=b[1]);}else{a="";}return a;},jsEscape:function(a){return a.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029");},createXhr:j.createXhr||function(){var b,f,d;if("undefined"!==typeof XMLHttpRequest){return new XMLHttpRequest;}if("undefined"!==typeof ActiveXObject){for(f=0;3>f;f+=1){d=a[f];try{b=new ActiveXObject(d);}catch(c){}if(b){a=[d];break;}}}return b;},parseName:function(a){var b,f,d=!1,c=a.indexOf(".");b=0===a.indexOf("./")||0===a.indexOf("../");-1!==c&&(!b||1<c)?(b=a.substring(0,c),f=a.substring(c+1,a.length)):b=a;a=f||b;c=a.indexOf("!");-1!==c&&(d="strip"===a.substring(c+1),a=a.substring(0,c),f?f=a:b=a);return{moduleName:b,ext:f,strip:d};},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(a,b,f,c){var e,g;e=d.xdRegExp.exec(a);if(!e){return !0;}a=e[2];e=e[3];e=e.split(":");g=e[1];e=e[0];return(!a||a===b)&&(!e||e.toLowerCase()===f.toLowerCase())&&(!g&&!e||g===c);},finishLoad:function(a,b,f,c){f=b?d.strip(f):f;j.isBuild&&(m[a]=f);c(f);},load:function(a,b,f,c){if(c.isBuild&&!c.inlineText){f();}else{j.isBuild=c.isBuild;var e=d.parseName(a);c=e.moduleName+(e.ext?"."+e.ext:"");var g=b.toUrl(c),h=j.useXhr||d.useXhr;!i||h(g,k,l,n)?d.get(g,function(b){d.finishLoad(a,e.strip,b,f);},function(a){f.error&&f.error(a);}):b([c],function(a){d.finishLoad(e.moduleName+"."+e.ext,e.strip,a,f);});}},write:function(a,b,f){if(m.hasOwnProperty(b)){var c=d.jsEscape(m[b]);f.asModule(a+"!"+b,"define(function () { return '"+c+"';});\n");}},writeFile:function(a,b,f,c,e){b=d.parseName(b);var g=b.ext?"."+b.ext:"",h=b.moduleName+g,i=f.toUrl(b.moduleName+g)+".js";d.load(h,f,function(){var b=function(a){return c(i,a);};b.asModule=function(a,b){return c.asModule(a,i,b);};d.write(a,h,b,e);},e);}};if("node"===j.env||!j.env&&"undefined"!==typeof process&&process.versions&&process.versions.node){h=require.nodeRequire("fs"),d.get=function(a,b){var f=h.readFileSync(a,"utf8");0===f.indexOf("\ufeff")&&(f=f.substring(1));b(f);};}else{if("xhr"===j.env||!j.env&&d.createXhr()){d.get=function(a,b,f,c){var e=d.createXhr(),g;e.open("GET",a,!0);if(c){for(g in c){c.hasOwnProperty(g)&&e.setRequestHeader(g.toLowerCase(),c[g]);}}if(j.onXhr){j.onXhr(e,a);}e.onreadystatechange=function(){var c;4===e.readyState&&(c=e.status,399<c&&600>c?(c=Error(a+" HTTP status: "+c),c.xhr=e,f(c)):b(e.responseText));};e.send(null);};}else{if("rhino"===j.env||!j.env&&"undefined"!==typeof Packages&&"undefined"!==typeof java){d.get=function(a,b){var f,c,d=new java.io.File(a),e=java.lang.System.getProperty("line.separator"),d=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(d),"utf-8")),g="";try{f=new java.lang.StringBuffer;(c=d.readLine())&&(c.length()&&65279===c.charAt(0))&&(c=c.substring(1));for(f.append(c);null!==(c=d.readLine());){f.append(e),f.append(c);}g=String(f.toString());}finally{d.close();}b(g);};}else{if("xpconnect"===j.env||!j.env&&"undefined"!==typeof Components&&Components.classes&&Components.interfaces){c=Components.classes,b=Components.interfaces,Components.utils["import"]("resource://gre/modules/FileUtils.jsm"),d.get=function(a,f){var d,e,g={},h=new FileUtils.File(a);try{d=c["@mozilla.org/network/file-input-stream;1"].createInstance(b.nsIFileInputStream),d.init(h,1,0,!1),e=c["@mozilla.org/intl/converter-input-stream;1"].createInstance(b.nsIConverterInputStream),e.init(d,"utf-8",d.available(),b.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),e.readString(d.available(),g),e.close(),d.close(),f(g.value);}catch(i){throw Error((h&&h.path||"")+": "+i);}};}}}}return d;});define("text!util/../../templates/stitches.html",[],function(){return'\x3cscript type\x3d"text/html" id\x3d"stitches_tmpl"\x3e\r\n\r\n    \x3cdiv class\x3d"stitches"\x3e\r\n        \x3c!-- .stitches-toolbar --\x3e\r\n        \x3cdiv class\x3d"stitches-toolbar btn-toolbar"\x3e\r\n            \x3cdiv class\x3d"btn-group shrink"\x3e\r\n                \x3ca href\x3d"http://draeton.github.com/stitches/" class\x3d"btn btn-small btn-link"\x3e\x3cstrong\x3eStitches\x3c/strong\x3e\x3c/a\x3e\r\n                \x3cbutton data-action\x3d"open" class\x3d"btn btn-small files" title\x3d"Open"\x3e\x3ci class\x3d"icon-folder-open"\x3e\x3c/i\x3e \x3cspan\x3eOpen\x3c/span\x3e\x3cinput class\x3d"file" type\x3d"file" multiple\x3d""\x3e\x3c/button\x3e\r\n                \x3cbutton data-action\x3d"settings" class\x3d"btn btn-small" title\x3d"Settings"\x3e\x3ci class\x3d"icon-cog"\x3e\x3c/i\x3e \x3cspan\x3eSettings\x3c/span\x3e\x3c/button\x3e\r\n                \x3cbutton data-action\x3d"generate" class\x3d"btn btn-small disabled" title\x3d"Generate"\x3e\x3ci class\x3d"icon-tasks"\x3e\x3c/i\x3e \x3cspan\x3eGenerate\x3c/span\x3e\x3c/button\x3e\r\n                \x3cbutton data-action\x3d"clear" class\x3d"btn btn-small disabled" title\x3d"Clear"\x3e\x3ci class\x3d"icon-remove"\x3e\x3c/i\x3e \x3cspan\x3eClear\x3c/span\x3e\x3c/button\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv class\x3d"btn-group shrink"\x3e\r\n                \x3ca href\x3d"#" data-action\x3d"spritesheet" class\x3d"btn btn-small disabled" title\x3d"Spritesheet" target\x3d"_blank"\x3e\x3ci class\x3d"icon-download-alt"\x3e\x3c/i\x3e \x3cspan\x3eSpritesheet\x3c/span\x3e\x3c/a\x3e\r\n                \x3ca href\x3d"#" data-action\x3d"stylesheet" class\x3d"btn btn-small disabled" title\x3d"Stylesheet" target\x3d"_blank"\x3e\x3ci class\x3d"icon-download-alt"\x3e\x3c/i\x3e \x3cspan\x3eStylesheet\x3c/span\x3e\x3c/a\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv class\x3d"btn-group shrink"\x3e\r\n                \x3cbutton data-action\x3d"about" class\x3d"btn btn-small" title\x3d"About Stitches"\x3e\x3ci class\x3d"icon-info-sign"\x3e\x3c/i\x3e \x3cspan\x3eAbout\x3c/span\x3e\x3c/button\x3e\r\n            \x3c/div\x3e\r\n        \x3c/div\x3e\r\n        \x3c!-- /.stitches-toolbar --\x3e\r\n\r\n        \x3c!-- .stitches-progress --\x3e\r\n        \x3cdiv class\x3d"stitches-progress collapse"\x3e\r\n            \x3cdiv class\x3d"progress progress-warning"\x3e\r\n                \x3cdiv class\x3d"bar" style\x3d"width: 0%;"\x3e\x3c/div\x3e\r\n            \x3c/div\x3e\r\n        \x3c/div\x3e\r\n        \x3c!-- /.stitches-progress --\x3e\r\n\r\n        \x3c!-- .stitches-drop-box --\x3e\r\n        \x3cdiv class\x3d"stitches-drop-box"\x3e\r\n            \x3cdiv class\x3d"stitches-overlay"\x3e\x3c/div\x3e\r\n\r\n            \x3cdiv class\x3d"stitches-wrap"\x3e\r\n\r\n                \x3c!-- .stitches-canvas --\x3e\r\n                \x3cdiv class\x3d"stitches-canvas"\x3e\r\n                    \x3cdiv class\x3d"stitches-sprite"\x3e\x3cimg src\x3d"img/test/github.png" data-name\x3d"github"/\x3e\x3c/div\x3e\r\n                    \x3cdiv class\x3d"stitches-sprite"\x3e\x3cimg src\x3d"img/test/gmail.png" data-name\x3d"gmail"/\x3e\x3c/div\x3e\r\n                    \x3cdiv class\x3d"stitches-sprite"\x3e\x3cimg src\x3d"img/test/linkedin.png" data-name\x3d"linkedin"/\x3e\x3c/div\x3e\r\n                    \x3cdiv class\x3d"stitches-sprite"\x3e\x3cimg src\x3d"img/test/stackoverflow.png" data-name\x3d"stackoverflow"\x3e\x3c/div\x3e\r\n                    \x3cdiv class\x3d"stitches-sprite"\x3e\x3cimg src\x3d"img/test/tumblr.png" data-name\x3d"tumblr"/\x3e\x3c/div\x3e\r\n                    \x3cdiv class\x3d"stitches-sprite"\x3e\x3cimg src\x3d"img/test/twitter.png" data-name\x3d"twitter"/\x3e\x3c/div\x3e\r\n                \x3c/div\x3e\r\n                \x3c!-- /.stitches-canvas --\x3e\r\n\r\n            \x3c/div\x3e\r\n\r\n            \x3c!-- .stitches-palettes --\x3e\r\n            \x3cdiv class\x3d"stitches-palettes"\x3e\r\n                \x3c!-- .stitches-settings --\x3e\r\n                \x3cdiv class\x3d"stitches-palette stitches-settings fade"\x3e\r\n                    \x3cdiv class\x3d"stitches-palette-header"\x3e\r\n                        \x3cbutton type\x3d"button" class\x3d"close" data-action\x3d"close"\x3e\x26times;\x3c/button\x3e\r\n                        \x3ch4\x3eSettings\x3c/h4\x3e\r\n                    \x3c/div\x3e\r\n\r\n                    \x3cdiv class\x3d"stitches-palette-body"\x3e\r\n                        \x3cform class\x3d"form-horizontal"\x3e\r\n                            \x3cdiv class\x3d"control-group hide"\x3e\r\n                                \x3clabel class\x3d"control-label"\x3ePosition\x3c/label\x3e\r\n                                \x3cdiv class\x3d"controls"\x3e\r\n                                    \x3clabel class\x3d"checkbox"\x3e\r\n                                        \x3cinput name\x3d"position" type\x3d"checkbox" value\x3d"auto"/\x3e Auto\r\n                                    \x3c/label\x3e\r\n                                \x3c/div\x3e\r\n                            \x3c/div\x3e\r\n\r\n                            \x3cdiv class\x3d"control-group"\x3e\r\n                                \x3clabel class\x3d"control-label"\x3eLayout\x3c/label\x3e\r\n                                \x3cdiv class\x3d"controls"\x3e\r\n                                    \x3clabel class\x3d"radio inline"\x3e\r\n                                        \x3cinput name\x3d"layout" type\x3d"radio" value\x3d"compact"/\x3e Compact\r\n                                    \x3c/label\x3e\r\n                                    \x3clabel class\x3d"radio inline"\x3e\r\n                                        \x3cinput name\x3d"layout" type\x3d"radio" value\x3d"vertical"/\x3e Vertical\r\n                                    \x3c/label\x3e\r\n                                    \x3clabel class\x3d"radio inline"\x3e\r\n                                        \x3cinput name\x3d"layout" type\x3d"radio" value\x3d"horizontal"/\x3e Horizontal\r\n                                    \x3c/label\x3e\r\n                                \x3c/div\x3e\r\n                            \x3c/div\x3e\r\n\r\n                            \x3cdiv class\x3d"control-group"\x3e\r\n                                \x3clabel class\x3d"control-label"\x3eCSS prefix\x3c/label\x3e\r\n                                \x3cdiv class\x3d"controls"\x3e\r\n                                    \x3cinput name\x3d"prefix" type\x3d"text" placeholder\x3d"CSS class prefix\x26hellip;"\x3e\r\n                                \x3c/div\x3e\r\n                            \x3c/div\x3e\r\n\r\n                            \x3cdiv class\x3d"control-group"\x3e\r\n                                \x3clabel class\x3d"control-label"\x3ePadding\x3c/label\x3e\r\n                                \x3cdiv class\x3d"controls"\x3e\r\n                                    \x3cdiv class\x3d"input-append"\x3e\r\n                                        \x3cinput name\x3d"padding" type\x3d"number" min\x3d"0" required placeholder\x3d"Sprite padding\x26hellip;"\x3e\r\n                                        \x3cspan class\x3d"add-on"\x3epx\x3c/span\x3e\r\n                                    \x3c/div\x3e\r\n                                \x3c/div\x3e\r\n                            \x3c/div\x3e\r\n\r\n                            \x3cdiv class\x3d"control-group"\x3e\r\n                                \x3clabel class\x3d"control-label"\x3eData URI\x3c/label\x3e\r\n                                \x3cdiv class\x3d"controls"\x3e\r\n                                    \x3clabel class\x3d"checkbox"\x3e\r\n                                        \x3cinput name\x3d"uri" type\x3d"checkbox" value\x3d"true"/\x3e Include encoded image in CSS\r\n                                    \x3c/label\x3e\r\n                                \x3c/div\x3e\r\n                            \x3c/div\x3e\r\n                        \x3c/form\x3e\r\n                    \x3c/div\x3e\r\n\r\n                    \x3cdiv class\x3d"stitches-palette-footer"\x3e\r\n                        \x3cdiv class\x3d"btn-toolbar"\x3e\r\n                            \x3cdiv class\x3d"btn-group"\x3e\r\n                                \x3cbutton class\x3d"btn btn-small" data-action\x3d"close"\x3e\x3cspan\x3eSave\x3c/span\x3e\x3c/button\x3e\r\n                                \x3cbutton class\x3d"btn btn-small" data-action\x3d"close"\x3e\x3cspan\x3eClose\x3c/span\x3e\x3c/button\x3e\r\n                            \x3c/div\x3e\r\n                        \x3c/div\x3e\r\n\r\n                        \x3cdiv class\x3d"clearfix"\x3e\x3c/div\x3e\r\n                    \x3c/div\x3e\r\n                \x3c/div\x3e\r\n                \x3c!-- /.stitches-settings --\x3e\r\n\r\n                \x3c!-- .stitches-properties --\x3e\r\n                \x3cdiv class\x3d"stitches-palette stitches-properties fade"\x3e\r\n                    \x3cdiv class\x3d"stitches-palette-header"\x3e\r\n                        \x3cbutton type\x3d"button" class\x3d"close" data-action\x3d"close"\x3e\x26times;\x3c/button\x3e\r\n                        \x3ch4\x3eSprite Properties\x3c/h4\x3e\r\n                    \x3c/div\x3e\r\n\r\n                    \x3cdiv class\x3d"stitches-palette-body"\x3e\r\n                        \x3cform class\x3d"form-horizontal"\x3e\r\n                            \x3cdiv class\x3d"control-group"\x3e\r\n                                \x3clabel class\x3d"control-label"\x3eName\x3c/label\x3e\r\n                                \x3cdiv class\x3d"controls"\x3e\r\n                                    \x3cinput name\x3d"name" type\x3d"text" required placeholder\x3d"Sprite name\x26hellip;"\x3e\r\n                                \x3c/div\x3e\r\n                            \x3c/div\x3e\r\n\r\n                            \x3cdiv class\x3d"control-group"\x3e\r\n                                \x3clabel class\x3d"control-label"\x3eCoordinates (x, y)\x3c/label\x3e\r\n                                \x3cdiv class\x3d"controls"\x3e\r\n                                    \x3cdiv class\x3d"input-append"\x3e\r\n                                        \x3cinput name\x3d"x" required disabled placeholder\x3d"From left\x26hellip;" class\x3d"input-mini"\x3e\r\n                                        \x3cspan class\x3d"add-on"\x3epx\x3c/span\x3e\r\n                                    \x3c/div\x3e\r\n                                    \x3cdiv class\x3d"input-append"\x3e\r\n                                        \x3cinput name\x3d"y" required disabled placeholder\x3d"From top\x26hellip;" class\x3d"input-mini"\x3e\r\n                                        \x3cspan class\x3d"add-on"\x3epx\x3c/span\x3e\r\n                                    \x3c/div\x3e\r\n                                \x3c/div\x3e\r\n                            \x3c/div\x3e\r\n                        \x3c/form\x3e\r\n                    \x3c/div\x3e\r\n\r\n                    \x3cdiv class\x3d"stitches-palette-footer"\x3e\r\n                        \x3cdiv class\x3d"btn-toolbar"\x3e\r\n                            \x3cdiv class\x3d"btn-group"\x3e\r\n                                \x3cbutton class\x3d"btn btn-small" data-action\x3d"remove"\x3e\x3cspan\x3eDelete\x3c/span\x3e\x3c/button\x3e\r\n                                \x3cbutton class\x3d"btn btn-small" data-action\x3d"close"\x3e\x3cspan\x3eSave\x3c/span\x3e\x3c/button\x3e\r\n                                \x3cbutton class\x3d"btn btn-small" data-action\x3d"close"\x3e\x3cspan\x3eClose\x3c/span\x3e\x3c/button\x3e\r\n                            \x3c/div\x3e\r\n                        \x3c/div\x3e\r\n\r\n                        \x3cdiv class\x3d"clearfix"\x3e\x3c/div\x3e\r\n                    \x3c/div\x3e\r\n                \x3c/div\x3e\r\n                \x3c!-- /.stitches-properties --\x3e\r\n\r\n                \x3c!-- .stitches-about --\x3e\r\n                \x3cdiv class\x3d"stitches-palette stitches-about fade in"\x3e\r\n                    \x3cdiv class\x3d"stitches-palette-header"\x3e\r\n                        \x3cbutton type\x3d"button" class\x3d"close" data-action\x3d"close"\x3e\x26times;\x3c/button\x3e\r\n                        \x3ch4\x3eAbout Stitches\x3c/h4\x3e\r\n                    \x3c/div\x3e\r\n\r\n                    \x3cdiv class\x3d"stitches-palette-body"\x3e\r\n                        \x3cp\x3e\x3ca href\x3d"http://draeton.github.com/stitches/"\x3eStitches\x3ca/\x3e is an HTML5 \x3ca href\x3d"http://en.wikipedia.org/wiki/Sprite_(computer_graphics)#Sprites_by_CSS"\x3esprite sheet\x3c/a\x3e generator.\x3c/p\x3e\r\n\r\n                        \x3cp\x3eDrag \x26amp; drop image files onto the space below, or use the \x26ldquo;Open\x26rdquo; link to load images using the file browser. Then, click \x26ldquo;Generate\x26rdquo; to create a sprite sheet and stylesheet. \x3cem\x3eThis demo uses a couple of HTML5 APIs, and it is only currently compatible with WebKit and Firefox browsers.\x3c/em\x3e\x3c/p\x3e\r\n\r\n                        \x3cp\x3eStitches is developed by \x3ca href\x3d"http://draeton.github.com"\x3eMatthew Cobbs\x3c/a\x3e in concert with the lovely open-source community at \x3ca href\x3d"http://github.com"\x3eGithub\x3c/a\x3e. Thanks are owed to the developers at Twitter for \x3ca href\x3d"http://twitter.github.com/bootstrap"\x3eBootstrap\x3c/a\x3e, and \x3ca href\x3d"http://glyphicons.com/"\x3eGlyphicons\x3c/a\x3e for some cool little icons.\x3c/p\x3e\r\n                    \x3c/div\x3e\r\n\r\n                    \x3cdiv class\x3d"stitches-palette-footer"\x3e\r\n                        \x3cdiv class\x3d"btn-toolbar"\x3e\r\n                            \x3cdiv class\x3d"btn-group"\x3e\r\n                                \x3cbutton class\x3d"btn btn-small" data-action\x3d"close"\x3e\x3cspan\x3eClose\x3c/span\x3e\x3c/button\x3e\r\n                            \x3c/div\x3e\r\n                        \x3c/div\x3e\r\n\r\n                        \x3cdiv class\x3d"clearfix"\x3e\x3c/div\x3e\r\n                    \x3c/div\x3e\r\n                \x3c/div\x3e\r\n                \x3c!-- /.stitches-properties --\x3e\r\n            \x3c/div\x3e\r\n            \x3c!-- /.stitches-palettes --\x3e\r\n        \x3c/div\x3e\r\n        \x3c!-- /.stitches-drop-box --\x3e\r\n    \x3c/div\x3e\r\n\r\n\x3c/script\x3e';});define("text!util/../../templates/sprite.html",[],function(){return'\x3cscript type\x3d"text/html" id\x3d"stitches_sprite_tmpl"\x3e\r\n    \x3cdiv class\x3d"stitches-sprite" style\x3d"top: \x3c%\x3dy%\x3epx; left: \x3c%\x3dx%\x3epx;"\x3e\r\n        \x3cimg src\x3d"\x3c%\x3dimage.src%\x3e"/\x3e\r\n    \x3c/div\x3e\r\n\x3c/script\x3e';});define("util/templates",["jquery","text!../../templates/stitches.html","text!../../templates/sprite.html"],function(e,d,h){var c={},b=function(a,f){var d=!/\W/.test(a)?c[a]=c[a]||b(document.getElementById(a).innerHTML):new Function("obj","var p\x3d[],print\x3dfunction(){p.push.apply(p,arguments);};with(obj){p.push('"+a.replace(/[\r\t\n]/g," ").split("\x3c%").join("\t").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("\t").join("');").split("%\x3e").join("p.push('").split("\r").join("\\'")+"');}return p.join('');");return f?d(f):d;},a=function(a,f){e(window.document.body).append(a);return b(f);};return{tmpl:b,stitches:a(d,"stitches_tmpl"),sprite:a(h,"stitches_sprite_tmpl")};});define("module/file-manager",["jquery","util/util"],function(e){var d={progress:function(){}},h=function(c,b){this.$element=e(c);this.settings=e.extend({},d,b);this.progress=this.settings.progress;this.processed=this.total=0;this.init();};h.prototype={constructor:h,init:function(){},processFiles:function(c){var b=this;this.total=c.length;this.processed=0;e.map(c,function(a){/jpeg|png|gif/.test(a.type)&&b.processFile(a);});this.progress(0,"info");},processFile:function(c){var b=this,a;try{a=new FileReader,a.onloadend=function(a){b.$element.trigger("create-sprite",[c.name,a.target.result]);b.progress(++b.processed/b.total);},a.readAsDataURL(c);}catch(d){this.$element.trigger("error",[d]);}}};return h;});define("module/drop-box",["jquery","util/util"],function(e,d){var h={},c=function(b,a){this.$element=e(b);this.$overlay=this.$element.find(".stitches-overlay");this.settings=e.extend({},h,a);this.init();};c.classname=".stitches-drop-box";c.prototype={constructor:c,init:function(){this.proxy();this.bind();},proxy:function(){d.proxy(this,"dragStart dragStop drop");},bind:function(){var b=this.$element.get(0),a=this.$overlay.get(0);b.addEventListener("dragenter",this.dragStart,!1);a.addEventListener("dragleave",this.dragStop,!1);a.addEventListener("dragexit",this.dragStop,!1);a.addEventListener("dragover",this.noop,!1);a.addEventListener("drop",this.drop,!1);},noop:function(b){b.preventDefault();b.stopPropagation();},dragStart:function(){this.$element.trigger("close-palettes");this.$element.trigger("show-overlay");},dragStop:function(b){e.contains(this.$element,b.target)&&this.$element.trigger("hide-overlay");},drop:function(b){var a=b.files||b.dataTransfer.files;b.stopPropagation();b.preventDefault();a.length?this.$element.trigger("process-files",[a]):this.$element.trigger("hide-overlay");}};return c;});define("util/array",["jquery"],function(e){return{remove:function(d,h){return e(d).filter(function(){return this!==h;});}};});define("module/sprite",["jquery","util/util","util/templates"],function(e,d,h){var c={name:"",src:"",padding:0,callback:null},b=function(a){this.settings=e.extend({},c,a);this.$element=null;this.name=d.cleanName(this.settings.name);this.src=this.settings.src;this.padding=parseInt(this.settings.padding,10);this.callback=this.settings.callback;this.placed=this.active=!1;this.init();};b.classname=".stitches-sprite";b.prototype={constructor:b,init:function(){this.load();},load:function(){var a=this;this.image=new Image;this.image.onload=function(){a.x=0;a.y=0;a.width=a.image.width+2*a.padding;a.height=a.image.height+2*a.padding;a.area=a.width*a.height;a.render();a.proxy();a.bind();a.callback&&a.callback(a);};this.image.src=this.src;},render:function(){var a=h.sprite(this);this.$element=e(a);this.$element.data("sprite",this);},proxy:function(){d.proxy(this,"click");},bind:function(){this.$element.on("click",this.click);},reset:function(){this.y=this.x=0;this.placed=!1;this.$element.removeClass("placed");},show:function(){this.$element.css({left:this.x+"px",top:this.y+"px",padding:this.padding+"px"}).addClass("placed");},click:function(){(this.active=!this.active)?(this.$element.trigger("clear-active",[this]),this.$element.trigger("open-properties",[this])):this.$element.trigger("close-properties");this.$element.toggleClass("active");},configure:function(a){a.padding&&(this.padding=parseInt(a.padding,10),this.width=this.image.width+2*this.padding,this.height=this.image.height+2*this.padding,this.area=this.width*this.height);}};return b;});define("module/canvas",["jquery","util/util","util/array","util/stitches","module/sprite"],function(e,d,h,c,b){var a={dimensions:{width:400,height:400},progress:function(){}},g=function(b,c){this.$element=e(b);this.settings=e.extend({},a,c);this.dimensions=this.settings.dimensions;this.progress=this.settings.progress;this.sprites=[];this.stylesheet=this.spritesheet=null;this.init();};g.classname=".stitches-canvas";g.prototype={constructor:g,init:function(){this.reset=d.debounce(this.reset,500);this.proxy();this.bind();this.setup();this.reset();},proxy:function(){d.proxy(this,"createSprite clearActive");},bind:function(){this.$element.on("create-sprite",this.createSprite);this.$element.on("clear-active",this.clearActive);},setup:function(){var a=this;this.$element.find(".stitches-sprite").each(function(){e(this);var b=e(this).find("img"),c=b.data("name"),b=b.attr("src");a.$element.trigger("create-sprite",[c,b]);}).remove();},reset:function(){this.$element.trigger("show-overlay");this.measure(this.sprites);this.place(this.sprites);this.cut(this.sprites);this.$element.trigger("hide-overlay");},measure:function(a){this.dimensions=c.getDimensions(a,this.settings.dimensions);},place:function(a){e.map(a,function(a){a.reset();});a=a.sort(function(a,b){return b.area===a.area?b.name>a.name?1:-1:b.area-a.area;});c.placeSprites(a,[],this.dimensions,this.progress);},cut:function(a){c.trim(a,this.dimensions);this.$element.css({width:this.dimensions.width+"px",height:this.dimensions.height+"px"});},add:function(a){this.$element.trigger("show-overlay");this.sprites.push(a);a.$element.appendTo(this.$element);this.$element.trigger("update-toolbar");this.reset();},remove:function(a){this.$element.trigger("show-overlay");this.sprites=h.remove(this.sprites,a);a.$element.fadeOut("fast").remove();this.$element.trigger("update-toolbar");this.$element.trigger("close-properties");this.reset();},clear:function(){this.$element.trigger("show-overlay");this.sprites=[];this.$element.empty();this.$element.trigger("update-toolbar");this.$element.trigger("close-properties");this.$element.trigger("open-settings");this.reset();},generateSheets:function(a){var b=this.sprites,d=a.prefix,e=a.uri;a=c.makeSpritesheet(b,this.dimensions);b=c.makeStylesheet(b,a,d,e);try{a=c.dataToObjectURL(a),b=c.dataToObjectURL(b);}catch(g){this.$element.trigger("error",[g]);}this.spritesheet=a;this.stylesheet=b;this.$element.trigger("update-toolbar");this.progress(1,"success");},clearActive:function(a,b){this.$element.find(".active").each(function(){var a=e(this),c=a.data("sprite");b&&c!==b&&(a.removeClass("active"),c.active=!1);});},createSprite:function(a,c,d){var e=this;new b({name:c,src:d,padding:this.settings.padding,callback:function(a){e.add(a);}});}};return g;});define("module/toolbar",["jquery"],function(e){var d={name:"",actions:{}},h=function(c,b){this.$element=e(c);this.settings=e.extend({},d,b);this.name=this.settings.name;this.actions=this.settings.actions;this.init();};h.classname=".stitches-toolbar";h.prototype={constructor:h,init:function(){this.bind();},bind:function(){var c=this;e.each(this.actions,function(b,a){e.each(a,function(a,d){var e="[data-action\x3d"+b+"]",h=c.getHandler(c,d);if("instance"===b){c.$element.on(a,c.getHandler(c,h));}else{c.$element.on(a,e,h);}});});},getHandler:function(c,b){return function(a){e(a.currentTarget).is(".disabled")?(a.stopPropagation(),a.preventDefault()):b.apply(c,arguments);};},toggleActions:function(c,b){var a=this;"string"===typeof c&&(c=c.split(" "));e.map(c,function(c){a.$element.find("[data-action\x3d"+c+"]").toggleClass("disabled",b);});},enable:function(c){this.toggleActions(c,!1);},disable:function(c){this.toggleActions(c,!0);}};return h;});define("module/palette",["jquery","util/util","module/toolbar"],function(e,d,h){var c={name:"",visible:!1,actions:{},fields:{}},b=function(a,b){this.$element=e(a);this.settings=e.extend({},c,b);this.name=this.settings.name;this.visible=this.settings.visible;this.actions=this.settings.actions;this.fields=this.settings.fields;this.source=null;this.init();};b.classname=".stitches-palette";d.inherit(b,h,{init:function(){this._super("init",this,arguments);this.$element.toggleClass("in",this.visible);},bind:function(){var a=this;this._super("bind",this,arguments);e.each(this.fields,function(b,c){e.each(c,function(c,d){var e="[name\x3d"+b+"]",f=a.getHandler(a,d);a.$element.on(c,e,f);});});},open:function(){this.$element.addClass("in");this.visible=!0;},close:function(){this.$element.removeClass("in");this.visible=!1;},configure:function(a){var b=this;this.source=a.source;e.each(a.inputs,function(a,c){var d=b.$element.find("input[name\x3d"+a+"]");switch(d.attr("type")){case"radio":case"checkbox":d=d.removeAttr("checked").filter("[value\x3d"+c+"]");d.attr("checked","checked");break;default:d.val(c);}});}});return b;});define("module/stitches","jquery modernizr util/util util/stitches util/templates module/file-manager module/drop-box module/canvas module/toolbar module/palette".split(" "),function(e,d,h,c,b,a,g,f,i,k){("undefined"===typeof FileReader||!d.draganddrop)&&require(["../lib/dropfile/dropfile"]);d.canvas||require(["../lib/flashcanvas/flashcanvas"]);var l={layout:"compact",prefix:"sprite",padding:5,uri:!1};d=function(a,b){this.$element=e(a);this.settings=e.extend({},l,b);this.init();};d.prototype={constructor:d,init:function(){this.render();this.proxy();this.bind();this.setFileManager();this.setDropBox();this.setToolbar();this.setLayout();this.setCanvas();this.setPalettes();},render:function(){var a=b.stitches({});this.$element.append(a);this.$overlay=this.$element.find(".stitches-overlay");this.$dropBox=this.$element.find(".stitches-drop-box");this.$toolbar=this.$element.find(".stitches-toolbar");this.$canvas=this.$element.find(".stitches-canvas");this.$progress=this.$element.find(".stitches-progress .progress");this.$progressBar=this.$element.find(".stitches-progress .bar");this.$about=this.$element.find(".stitches-about");this.$settings=this.$element.find(".stitches-settings");this.$properties=this.$element.find(".stitches-properties");},proxy:function(){h.proxy(this,"showOverlay hideOverlay openAbout closeAbout openSettings closeSettings openProperties closeProperties closePalettes processFiles updateToolbar updateProgress errorHandler");},bind:function(){this.$element.on("show-overlay",this.showOverlay);this.$element.on("hide-overlay",this.hideOverlay);this.$element.on("open-about",this.openAbout);this.$element.on("close-about",this.closeAbout);this.$element.on("open-settings",this.openSettings);this.$element.on("close-settings",this.closeSettings);this.$element.on("open-properties",this.openProperties);this.$element.on("close-properties",this.closeProperties);this.$element.on("close-palettes",this.closePalettes);this.$element.on("process-files",this.processFiles);this.$element.on("update-toolbar",this.updateToolbar);this.$element.on("error",this.errorHandler);},setFileManager:function(){this.fileManager=new a(this.$canvas,{progress:this.updateProgress});},setDropBox:function(){this.dropBox=new g(this.$dropBox);},setLayout:function(){c.setLayout(this.settings.layout);},setCanvas:function(){this.canvas=new f(this.$canvas,{padding:this.settings.padding,progress:this.updateProgress});},setToolbar:function(){var a=this;this.toolbar=new i(this.$toolbar,{name:"toolbar",actions:{open:{change:function(b){var c=a.$toolbar.find("input[type\x3dfile]"),d=c.clone(!0).val("");a.$element.trigger("process-files",[b.target.files]);c.replaceWith(d);}},settings:{click:function(){a.$element.trigger("open-settings");}},reset:{click:function(){a.canvas.reset();}},generate:{click:function(){a.$element.trigger("show-overlay");a.canvas.generateSheets(a.settings);a.$element.trigger("hide-overlay");}},clear:{click:function(){a.canvas.clear();}},spritesheet:{click:function(){}},stylesheet:{click:function(){}},about:{click:function(){a.$element.trigger("open-about");}}}});},setPalettes:function(){var a=this,b=new k(this.$about,{name:"about",visible:!0,actions:{close:{click:function(){this.close();}}}}),d=new k(this.$settings,{name:"settings",visible:!1,actions:{close:{click:function(){a.$element.trigger("close-settings");}}},fields:{layout:{change:function(){var b=this.$element.find("input[name\x3dlayout]:checked").val();this.source.layout=b;c.setLayout(b);a.canvas.reset();}},prefix:{"input blur":function(a){a=e(a.currentTarget).val();this.source.prefix=a;}},padding:{"input blur":function(b){var c=e(b.currentTarget).val();this.source.padding=c;a.canvas.padding=c;e.map(a.canvas.sprites,function(a){a.configure({padding:c});});a.canvas.reset();}},uri:{change:function(a){a=e(a.currentTarget).is(":checked");this.source.uri=a;}}}}),f=new k(this.$properties,{name:"properties",visible:!1,actions:{close:{click:function(){a.$element.trigger("close-properties");}},remove:{click:function(){a.canvas.remove(this.source);}}},fields:{name:{"input blur":function(a){var b=e(a.currentTarget).val(),c=h.cleanName(b);this.source.name=c;b!==c&&e(a.currentTarget).val(c);}}}});this.palettes={about:b,settings:d,properties:f};},showOverlay:function(){this.$overlay.fadeTo("fast",0.4);},hideOverlay:function(){this.$overlay.fadeOut("fast");},openAbout:function(){this.closePalettes();this.palettes.about.open();},closeAbout:function(){this.palettes.about.visible&&this.palettes.about.close();},openSettings:function(){this.closePalettes();this.palettes.settings.configure({source:this.settings,inputs:{layout:this.settings.layout,prefix:this.settings.prefix,padding:this.settings.padding,uri:this.settings.uri}});this.palettes.settings.open();},closeSettings:function(){this.palettes.settings.visible&&this.palettes.settings.close();},openProperties:function(a,b){this.closePalettes();this.palettes.properties.configure({source:b,inputs:{name:b.name,x:b.x+b.padding,y:b.y+b.padding}});this.palettes.properties.open();},closeProperties:function(){this.palettes.properties.visible&&(this.palettes.properties.close(),this.canvas.$element.trigger("clear-active",[!0]));},closePalettes:function(){this.closeAbout();this.closeSettings();this.closeProperties();},processFiles:function(a,b){this.fileManager.processFiles(b);},updateToolbar:function(){var a=this.toolbar.$element,b=this.toolbar,c=this.canvas;c.sprites.length?b.enable("reset generate clear"):b.disable("reset generate clear");c.spritesheet&&c.stylesheet?(a.find("[data-action\x3dspritesheet]").attr("href",c.spritesheet),a.find("[data-action\x3dstylesheet]").attr("href",c.stylesheet),b.enable("spritesheet stylesheet")):(a.find("[data-action\x3dspritesheet]").attr("href","#"),a.find("[data-action\x3dstylesheet]").attr("href","#"),b.disable("spritesheet stylesheet"));},updateProgress:function(a,b){var c=Math.ceil(100*a);100===c&&("danger"!==b&&"warning"!==b)&&(b="success");b&&this.$progress.attr({"class":"progress progress-striped progress-"+b});this.$progressBar.css({width:c+"%"});},errorHandler:function(a,b,c){this.updateProgress(1,c||"warning");}};return d;});requirejs.config({paths:{jquery:"wrap/jquery",modernizr:"wrap/modernizr"}});require(["jquery","module/stitches"],function(e,d){e(document).ready(function(){e(".stitches").each(function(){new d(this);});});});define("stitches",function(){});