/**
 * navigation.js
 *
 * Handles toggling the navigation menu for small screens and enables tab
 * support for dropdown menus.
 */
jQuery( document ).ready(function($) {

	/**
	 * $.fn.addFixed
	 *
	 * Changes an element to postion fixed when it hits the top of the screen
	 * or the distance from the top specified in the function.
	 */
	$.fn.addFixed = function( distance, addPlaceholder ) {
		var elem = this;

		var origionalCSS = {
			position: elem.css( 'position' ),
			top: elem.css( 'top' )
		}

		// Ensure the variables have their proper values.

		// Defaults to zero.
		if ( typeof distance === 'function' ) {
			topDistance = distance();
		} else if ( typeof distance !== 'undefined' ) {
			topDistance = distance;
		} else {
			distance = 0;
		}

		// Defaults to true.
		if ( typeof addPlaceholder == 'undefined' ) {
			addPlaceholder = true;
		}

		// Make the element positioned fixed when it hits the specified
		// distance from the top.
		var addFixedFunc = function() {

			var topDistance = distance;



			if ( window.scrollTop() > topDistance ) {
				// Change the properties of the element to display fixed.
				elem.css( 'position', 'fixed' );
				elem.css( 'top', elem.offset().top + 'px' );

				if ( addPlaceholder ) {
					var placeholder = $( '<div></div>', {
						class: 'placeholder',
						height: elem.height(),
						width: elem.width(),
					} );

					elem.before( placeholder );
				}

				// Remove the window selector looking for this occurance.
				$( window ).unbind( 'scroll', addFixedFunc );
				$( window ).bind( 'scroll', removeFixedFunc );
			}

		};

		var removeFixedFunc = function() {
			var topDistance = distance;

			if ( window.scrollTop() < topDistance ) {
				elem.css( 'position', origionalCSS['postion'] );
				elem.css( 'top', origionalCSS['top'] );

				if ( addPlaceholder ) {
					// Remove the placeholder.
					elem.siblings('.placeholder:first').remove();
				}

				// remove the window event handler looking for this occurance.
				$( window ).unbind( 'scroll', removeFixedFunc );
				$( window ).bind( 'scroll', addFixedFunc );
			}
		}


		// Add the begining window attachement
		if ( window.scrollTop < distance ) {
			$( window ).bind( 'scroll', addFixedFunc );
		} else {
			$( window ).bind( 'scroll', removeFixedFunc );
		}

		return this;
	}



});
