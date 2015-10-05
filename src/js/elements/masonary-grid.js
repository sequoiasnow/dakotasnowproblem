jQuery(document).ready(function($) {
    /**
     * Creats some default class implementation of the snowgrid.
     */
    $( '.snowgrid' ).each( function() {
        $( this ).snowgrid( '*[class^=column]' );
    } );
});
