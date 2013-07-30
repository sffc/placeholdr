Placeholdr
==========

**Placeholdr** is a super-lightweight drop-in jQuery-based polyfill to support the HTML5 placeholder attribute in IE 9 and other non-compliant browsers.  Minified size, even with the license, is less than 1 KB!

Placeholdr is licensed under the X11 open-source license.

## Basic Usage

    <script type="text/javascript" src="placeholdr.min.js"></script>

It's really that simple.

## Installation

Choose one:

- Add this repository as a subrepo to your project and symlink `placeholder.min.js` to your javascript assets folder.  This enables you to easily receive updates.
- Download the `placeholder.min.js` file directly to your assets folder.  Don't forget to check for updates by visiting this page every few months.

## Advanced Usage

Placeholdr exposes a `placeholdr()` jQuery function.  When called on a jQuery object, Placeholdr searches all decendants of the object for inputs that have a `placeholder` attribute.

Placeholdr runs the following code on page load:

    $(document).placeholdr(); // automatically run in $(document).ready()

You need to re-run Placeholdr if you dynamically add new input placeholder elements.  For example:

    var myForm = $("<form><input placeholder='Hello World'></form>");
    $(document.body).append(myForm);
    myForm.placeholdr();

By default, Placeholdr colors the placeholder text gray #AAA.  If you would like to change this behavior, add CSS for the `.placeholdr` class:

    .placeholdr {
        color: blue;
    }

Note that this CSS must be included *after* the Placeholdr library.  If this is not possible, add the `!important` flag to your color declaration.

## Contributing

Fork this repository on Github, make your changes, and submit a pull request.  Feel free to add your name to the copyright.  I use the [Closure Compiler](http://closure-compiler.appspot.com/home) on "Simple" mode to minify the JavaScript.
