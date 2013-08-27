Placeholdr
==========

**Placeholdr** is a lightweight drop-in jQuery-based polyfill to support the HTML5 placeholder attribute in IE 9 and other non-compliant browsers.  Minified size is less than 1 KB!

There are probably over a dozen HTML5 placeholder polyfills in the wild.  Some of them take care of the form submission issue, others take care of the password issue, and others require you to do extra work in order to install them in your site.  The goal with Placeholdr is to make a one-stop drop-in solution to solve your HTML5 placeholder compatibility issues while at the same time patching for the common pitfalls in placeholder polyfills.

Placeholdr is licensed under the X11 open-source license.

This version of Placeholdr was forked from the original author's git project at https://github.com/vote539/placeholdr. A bunch of options were added and some of the convenient auto-initialize behavior was removed in a series of backwards-incompatible changes. This version may continue to evolve in order to meet specialized needs of its users. If you are looking for a simpler HTML5 placeholder plugin, the original version is highly recommended.

### Why use this library? Top 3 reasons

* Supports both the explicit HTML 5 spec and the unofficial behavior as implemented by Chrome, Firefox, and Safari. Behavior can be applied to older clients that don't support the behavior, and to newer clients to override the native implementation. Ensure a consistent experience for all users of your site in all clients.
* Uses input values rather than positioned spans. Less elegant, sure, but also less problematic to style consistently.
* Despite my best efforts at feature creep, it's still very short and simple. Only one source file, easy to plug in to your project and easy to modify to fit your needs.

## Basic Usage

Download `placeholdr.min.js` to your static assets folder.  Then put this in your HTML5 document:

    <script type="text/javascript" src="placeholdr.min.js"></script>

### Initialization

Placeholdr exposes a `placeholdr()` jQuery function.  When called on a jQuery object, Placeholdr searches all descendants of the object for inputs that have a `placeholder` attribute, and initializes them. The easiest way to initialize your entire page is to run Placeholder against the root document node on page load. For example:

    $(function () {
        $(document).placeholdr();
    });

#### Initialization Options

See the source code for available options.

## Advanced Usage

### Installation

- Add this repository as a subrepo to your project and symlink `placeholder.js` to your javascript assets folder.  This enables you to easily receive updates.
- Download the `placeholder.js` file directly to your assets folder.  Don't forget to check for updates by visiting this page every few months.

### Dynamic DOM manipulation

If you dynamically add DOM elements that were not initialized, you will then have to initialize those new elements using the ``$.fn.placeholdr`` initialization function. For example:

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

Fork this repository on Github, make your changes, and submit a pull request.  Feel free to add your name to the copyright.

## Wish list

* Force caret to always be at beginning of placeholder text in clear-on-keypress mode
* Submit pull request back to Placeholdr project. Needs smarter initialization logic so lib can be initialized on page load by default, but also easily disable the auto-startup logic
* Better handling of styles / classes
* Update readme with advanced init options
