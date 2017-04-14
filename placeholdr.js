/*
 * Copyright (c) 2013 Shane Carr and Sam Placette
 *
 * https://github.com/SamPlacette/placeholdr
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function($, ns, placeholderAttribute, origValFn, alternatePlaceholderAttribute){
	// Utility functions
	var findPlaceholderInputs = function () {
		var $this = $(this);
		return $this.find("["+placeholderAttribute+"]," +
											"["+alternatePlaceholderAttribute+"]");
	};

	var getPlaceholderText = function () {
		var $this = $(this);
		return ($this.attr(placeholderAttribute) ||
						$this.attr(alternatePlaceholderAttribute));
	};

	var setCursorPositionAtStart = function () {
		if (typeof this.selectionStart == "number") {
			this.selectionStart = 0;
			this.selectionEnd = 0;
		}
		else if (typeof this.createTextRange != "undefined") {
			var range = this.createTextRange();
			range.collapse(true);
			range.moveStart('character', 0);
			range.moveEnd('character', 0);
			range.select();
		}
	};

	var putPlaceholder = function(){
		var $this = $(this);
		if ($this.hasClass(ns)) { return; } // idempotent
		if (!$this[origValFn]()) {
			$this.addClass(ns);
			if ($this.attr("type") === "password") {
				$this.attr("type", "text");
				$this.data(ns+"-pwd", true);
			}
			$this[origValFn](getPlaceholderText.call(this));
			// disable selecting range and caret position within the placeholder text
			// TODO this little snippet needs more testing (only IE9 and IE10 so far)
			$this.on('mouseup', setCursorPositionAtStart)
					 .on('selectstart', false);
			if ($this.is(':focus')) {
				setCursorPositionAtStart.call(this);
			}
		}
	};

	var clearPlaceholder = function(){
		var $this = $(this);
		$this.removeClass(ns);
		if ($this.data(ns+"-pwd")) {
			$this.attr("type", "password");
		}
		if ($this[origValFn]() === getPlaceholderText.call(this)){
			$this[origValFn]("");
		}
		// re-enable selecting range and caret position within the input text
		$this.off('mouseup', setCursorPositionAtStart)
				 .off('selectstart', false);
	};

	var clearPlaceholdersInForm = function(){
		findPlaceholderInputs.call(this).each(function() {
			if ($(this).data(ns)) clearPlaceholder.call(this);
		});
	};

	// options: Object (optional)
	//	options.preserveOnFocus: Boolean. If truthy, preserve placeholder text
	//																		on focus (hide on keypress instead)
	//	options.overrideNative: Boolean. If truthy, override native placeholder
	$.fn.placeholdr = function(options){
		// ensure options exists (avoid null reference errors)
		options || (options = {});
		// Don't evaluate the polyfill if the browser supports placeholders
		// unless an option specifies to override the native implementation
		var overrideNative = options.overrideNative || false;
		if (placeholderAttribute in document.createElement("input") &&
				! overrideNative
		) {
			return;
		}

		// Find and iterate through all inputs with a native placeholder attribute
		$(this).find("["+placeholderAttribute+"]").each(function() {
			var $this = $(this);

			// leave now if we've polyfilled this element before (idempotent)
			if ($this.data(ns)) return;
			$this.data(ns, true);

			if (overrideNative) {
				// copy original placeholder text to alternate location
				$this.attr(alternatePlaceholderAttribute,
									 $this.attr(placeholderAttribute));
				// clear native placeholder attr to disable native implementation
				$this.attr(placeholderAttribute, '');
			}

			// put the placeholder into the value
			putPlaceholder.call(this);

			var putPlaceholderHandler = function (evt) {
				var target = this;
				// set putPlaceholder to execute in near future in order to catch
				// IE10 clear event
				setTimeout(function () {
					putPlaceholder.call(target, evt);
				}, 25);
			};
			// just for consistency, define a handler for clear too
			var clearPlaceholderHandler = clearPlaceholder;

			if (options && options.preserveOnFocus) {
				// clear placeholder when characters are entered
				$this.on('keypress', clearPlaceholderHandler)
				// restore placeholder when input is cleared
						 .on('blur change mouseup keyup', putPlaceholderHandler);
			}
			else {
				// handle focus and blur events
				$this.focus(clearPlaceholderHandler);
				$this.blur(putPlaceholderHandler);
			}
		});

		// Find and iterate through all form elements in order to prevent
		// placeholders from being submitted in forms.
		$(this).find("form").each(function(){
			var $this = $(this);

			// leave now if we've polyfilled this element before (idempotent)
			if ($this.data(ns)) return;
			$this.data(ns, true);

			$this.submit(clearPlaceholdersInForm);
		});
	};

	// A convenience method to provide a common interface for consumers to
	// get placeholder text value, regardless of whether implementation is
	// native or via placeholdr library:
	$.fn.getPlaceholderText = function () {
		return getPlaceholderText.call(this);
	};

	// Overwrite the existing jQuery val() function
	$.fn[origValFn] = $.fn.val;
	$.fn.val = function(txt){
		var $this = $(this);
		if ($.type(txt) === "undefined"
		 && $this.data(ns)
		 && $this[origValFn]() === getPlaceholderText.call(this)
		 ){
			return "";
		}
		if ($.type(txt) === "string") {
			clearPlaceholder.call(this);
		}
		return $.fn[origValFn].apply(this, arguments);
	};

	// Add default CSS rule
	document.write("<style>." + ns + "{color:#AAA;}</style>");

// $, ns, placeholderAttribute, origValFn, alternatePlaceholderAttribute
})(jQuery, "placeholdr", "placeholder", "placeholdrVal", "placeholdr");
