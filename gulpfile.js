var gulp    = require( 'gulp' ),
    gutil   = require( 'gulp-util' ),
    compass = require( 'gulp-compass' ),
    concat  = require( 'gulp-concat' );


// Automate the compass compliation of the sass backend
gulp.task( 'styles', function() {
    gulp.src( 'sass/**/*.scss' )
        .pipe(compass({
            config_file: 'config.rb',
            sass: 'sass',
            css: 'stylesheets'
        }))
        .pipe(gulp.dest( 'stylesheets' ));
});

// Automate the admin react compilation into a single file.
gulp.task( 'js', function() {
    gulp.src( 'src/plugins/*.js' )
        .pipe(concat( 'plugins.js' ))
        .pipe(gulp.dest( 'dist/js/' ));

    gulp.src( 'src/elements/*.js' )
        .pipe(concat( 'elements.js' ))
        .pipe(gulp.dest( 'dist/js/' ));

    gulp.src( 'src/pages/*.js' )
        .pipe(concat( 'pages.js' ))
        .pipe(gulp.dest( 'dist/js/' ));

    gulp.src( 'src/libraries/*.js' )
        .pipe(concat( 'pages.js' ))
        .pipe(gulp.dest( 'dist/js/' ));
});


gulp.task( 'watch', function() {
    gulp.watch( 'sass/**/*.scss', [ 'styles' ] );

    gulp.watch( '/src/**/*.js', [ 'js' ] )
});
