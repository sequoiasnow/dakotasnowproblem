var gulp    = require( 'gulp' ),
    gutil   = require( 'gulp-util' ),
    compass = require( 'gulp-compass' ),
    path    = require( 'path' ),
    concat  = require( 'gulp-concat' );

// Automate the compass compliation of the src/sass backend
gulp.task( 'styles', function() {
    gulp.src( 'src/sass/**/*.scss' )
        .pipe(compass({
            images: 'images',
            sass: 'src/sass',
            css: 'dist/css'
        }))
        .pipe(gulp.dest( 'dist/css' ));
});

// Automate the admin react compilation into a single file.
gulp.task( 'js', function() {
    gulp.src( 'src/js/plugins/*.js' )
        .pipe(concat( 'plugins.js' ))
        .pipe(gulp.dest( 'dist/js/' ));

    gulp.src( 'src/js/elements/*.js' )
        .pipe(concat( 'elements.js' ))
        .pipe(gulp.dest( 'dist/js/' ));

    gulp.src( 'src/js/pages/*.js' )
        .pipe(concat( 'pages.js' ))
        .pipe(gulp.dest( 'dist/js/' ));

    gulp.src( 'src/js/libraries/*.js' )
        .pipe(concat( 'libraries.js' ))
        .pipe(gulp.dest( 'dist/js/' ));
});

gulp.task( 'watch', function() {
    gulp.watch( 'src/sass/**/*.scss', [ 'styles' ] );
    gulp.watch( 'src/js/**/*.js', [ 'js' ] )
});

gulp.task( 'default', [ 'styles', 'js' ] );
