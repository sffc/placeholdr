Placeholdr
==========

**Placeholdr** is a super-lightweight drop-in jQuery-based polyfill to support the HTML5 placeholder attribute in IE 9 and other non-compliant browsers.  Minified size is less than 1 KB!

There are probably over a dozen HTML5 placeholder polyfills in the wild.  Some of them take care of the form submission issue, others take care of the password issue, and others require you to do extra work in order to install them in your site.  The goal with Placeholdr is to make a one-stop drop-in solution to solve your HTML5 placeholder compatibility issues while at the same time patching for the common pitfalls in placeholder polyfills.

Placeholdr is licensed under the X11 open-source license.

## Basic Usage

Download `placeholdr.min.js` to your static assets folder.  Then put this in your HTML5 document:

    <script type="text/javascript" src="placeholdr.min.js"></script>

It's really that simple.

## Advanced Usage

### Installation

- Add this repository as a subrepo to your project and symlink `placeholder.min.js` to your javascript assets folder.  This enables you to easily receive updates.
- Download the `placeholder.min.js` file directly to your assets folder.  Don't forget to check for updates by visiting this page every few months.

### Dynamic DOM Manipulation

Placeholdr exposes a `placeholdr()` jQuery function.  When called on a jQuery object, Placeholdr searches all decendants of the object for inputs that have a `placeholder` attribute.

Placeholdr runs the following code on page load:

    $(document).placeholdr(); // automatically run in $(document).ready()

You need to re-run Placeholdr if you dynamically add new input placeholder elements.  For example:

    var myForm = $("<div><form><input placeholder='Hello World'></form></div>");
    $(document.body).append(myForm);
    myForm.placeholdr();

### Custom Placeholder Styles

By default, Placeholdr colors the placeholder text gray #AAA.  If you would like to change this behavior, add CSS for the `.placeholdr` class:

    .placeholdr {
        color: blue;
    }

Note that this CSS must be included *after* the Placeholdr library.  If this is not possible, add the `!important` flag to your color declaration.

## Notes

### jQuery $.fn.val()

Placeholdr overwrites the [jQuery .val() function](http://api.jquery.com/val/) in order to prevent unepected results when accessing the values of fields.  This means that you can safely use this function to access the values of placeholdr fields even when they are in their compatibility state.

### Forms

Placeholdr listens for the "submit" event on your forms and clears all Placeholdr-created value attributes upon form submit.

### Internet Explorer 8

In only IE8 and lower, the placeholder text appears as dots.  This can be fixed but only at the expense of increasing the library size by about 50%.  Since dots are already a universal symbol for "put a password here", we figure this is already a sufficient placeholder.

## Contributing

Fork this repository on Github, make your changes, and submit a pull request.  Feel free to add your name to the copyright.  I use the [Closure Compiler](http://closure-compiler.appspot.com/home) on "Simple" mode to minify the JavaScript.
