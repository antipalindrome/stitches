[![build status](https://raw.github.com/draeton/stitches/master/out/status.png)](http://draeton.github.com/stitches/)

[Stitches](http://draeton.github.com/stitches/)
==========

Stitches is an HTML5 sprite sheet generator.
The current version is `1.0.38`. Documentation is available
[here](http://draeton.github.com/stitches/stitches/docs/stitches.html).

## Implementation

After dependencies, Stitches requires a stylesheet, a script, and an HTML element to get the job done:

    <link rel="stylesheet" href="css/stitches-1.0.38-min.css">

    <script data-main="js/stitches.js" src="js/stitches-1.0.38-min.js"></script>

The sprite sheet generator is automatically created in elements that have the `stitches` class:

    <div class="stitches"></div>

## Dependencies

[jQuery](http://jquery.com/) 1.7.1, [Modernizr](http://modernizr.com/) 2.0.6, [Bootstrap](http://twitter.github.com/bootstrap/) 2.3.0

    <link rel="stylesheet" href="lib/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="lib/bootstrap/css/bootstrap-responsive.min.css">

    <script src="lib/jquery/jquery-1.7.1.js"></script>
    <script src="lib/modernizr/modernizr-2.0.6.min.js"></script>
    <script src="lib/bootstrap/js/bootstrap.min.js"></script>

## License

(The MIT License)

Copyright (c) 2013, <[Matthew Cobbs](mailto:draeton@gmail.com)>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.