jQuery(document).ready(function($) {
    /**
     * Functions that is fired when a resize event is complete. This is used
     * primarily for the window element.
     *
     * Example use `$(window).endResize()`
     */

    $.fn.endResize = function( callable func ) {

        var resizeID;

        var donResizing = function() {
            func.call( this );
        }

        this.resize( function() {
            clearTimeout( resizeID );

            resizeId = setTimeout( donResizing, 500 );
        } );

    }
});
