jQuery( document ).ready(function($) {
    /**
     * Creates a grid system based using absolutly positioned eleemnts. All
     * that is set is the width and top, left properties of each element.
     *
     * The containers width should be specifed as should the identity of the
     * container and the primary elements within that grid.
     *
     * The width of the grid elements is specified by class:
     *  column-1 ( default width )
     *  column-2 ( 2x default width )
     *  column-3 ( 3x default width )
     *  column-full ( 100% width )
     *
     * These can be changed by providing a map of column- class names to other
     * Identifiers in $.snowgrid.map
     *
     * All widths are specified in pixels.
     *
     * The default min-width is 220px
     * the default max-width is 350px
     *
     * These properties can be specified by setting:
     *  $.snowgrid.minWidth
     *  $.snowgrid.maxWidth
     */

    $.snowgrid = {
        minWidth: 220,
        maxWidth: 350,

        columnGap: 0, // Has not been properly implemented

        map: {
            'column': 'column',

            'column-1': 'column-1',
            'column-2': 'column-2',
            'column-3': 'column-3',
            'column-4': 'column-4',

            'column-full': 'column-full'
        }
    };

    $.fn.snowgrid = function( columnIdentifier, overrides ) {
        var settings = $.snowgrid.settings;

        // Ovverride default setting values
        if ( typeof overrides === 'object' ) {
            settings =  (function objectMerge( orig, over ) {
            	for ( var key in over ) {
            		if ( orig.hasOwnProperty( key ) ) {

            			if ( typeof over[key] === 'object' ) {
            				orig[ key ] = objectMerge( orig[key], over[key] );
            			} else {
            				orig[ key ] = over[key];
            			}

            		}
            	}
            	return orig;
            })( settings, overrides )
        }

        // Ensure the contianer is positioned relativly.
        if ( this.css( 'position' ) != 'relative' &&
             this.css( 'position' ) != 'absolute' &&
             this.css( 'position' ) != 'fixed' ) {

              this.css( 'position', 'relative' );

        }

        // Set the positions to absolute, note that any dynamically appended
        // must be positioned absolutly.
        this.find( columnIdentifier ).each(function() {
            $( this ).css( 'position', 'absolute' );
        });

        var colGap = settings.columnGap;

        $( window ).endResize(function() {

            var width  = this.width();

            var numbElements = Math.floor( width / settings.minWidth );
            var colWidth     = width / numbElements;

            var columns = this.find( columnIdentifier );

            // Set all the next top variables to zero by default.
            var nextTop = [];
            for ( var i = 0; i < numbElements; i++ ) { nextTop.push( 0 ); }

            var index = 0;
            columns.each(function() {

                // Set the number of columns for the given elemnt.
                var colNumb = 1;
                if ( $( this ).hasClass( settings.map['column-2'] ) ) {
                    colNumb = 2;
                } else if ( $( this ).hasClass( settings.map['column-3'] ) ) {
                    colNumb = 3;
                }  else if ( $( this ).hasClass( settings.map['column-4'] ) ) {
                    colNumb = 4;
                } else if ( $( this ).hasClass( settings.map['column-full'] ) ) {
                    colNumb = numbElements;
                }

                var width = colWidth * colNumb;
                var top   = nextTop[ index  % numbElements ];
                var left  = ( index % numbElements ) * ( colGap + colWidth );

                // Actually adjust the element size
                $( this ).css({
                    width: width + 'px',
                    top: top + 'px',
                    left: left + 'px'
                });

                // Update the value of the next top for this element...
                for ( colNumb; colNumb > 0; colNumb-- ) {
                    nextTop[ index % numbElements ] = $( this ).height() + colGap;
                    index++;
                }
            });

        });

        // Origionally resize the grid to scale.
        $( window ).endResize();
    };

});
