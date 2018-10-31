// Declare
// (variables, includes and sources)

var gulp         = require('gulp'),
    gutil        = require('gulp-util'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    sass         = require('gulp-sass'),
    watch        = require('gulp-watch'),
    sourcemaps   = require('gulp-sourcemaps'),
    connect      = require('gulp-connect'),
    livereload   = require('gulp-livereload'),
    wait         = require('gulp-wait'),
    SFTPDelay    = null,
    offlineDev   = true,
    reloadLive   = null,

    input  = {
      'img': 'source/img/*',
      'sass': 'source/scss/**/*.scss',
      'javascript': 'source/javascript/**/*.js',
      'html': 'html/**/*.html'
    },
    output = {
      'stylesheets': 'public/assets/stylesheets',
      'javascript': 'public/assets/javascript'
    };

if (offlineDev == true){
  SFTPDelay = '0';
}
else{
  SFTPDelay = '2000';
  reloadLive = 'reloadPage';
}

// Initiate -------------------------------------

/* Run live browser refresh */
gulp.task('idle', function() {
    console.log('OK');
});

/* Run live browser refresh */
gulp.task('connect', function() {
    connect.server({
        // livereload: true
    });
});

// Function Tasks -------------------------------

// JS Task
// (concat javascript files, minify if --type production)
gulp.task('build-js', function() {
    gulp.src(input.javascript)
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        //only uglify if gulp is ran with '--type production'
        .pipe(uglify())
        .pipe(gulp.dest(output.javascript))
        .pipe(wait(SFTPDelay))
        .pipe(livereload());
});

//SCSS Task
// (compile scss files)
gulp.task('build-css', function() {


    // Update 29th August, 2018 -
    // [Sass Watch] Added. Compiles saved only stylesheet for faster reloading.
    return watch('source/scss/**/*.scss', { ignoreInitial: false })
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .on('error', swallowError)
        .pipe(gulp.dest(output.stylesheets))
        .pipe(connect.reload())
        .pipe(wait(SFTPDelay))
        .pipe(livereload(reloadLive));


    // Older compiling code - 
    // Will want to set this up as an optional function to compile all stylesheets

    // gulp.src('source/scss/**/*.scss')
    //     .pipe(sourcemaps.init())
    //     .pipe(sass({outputStyle: 'compressed'}))
    //     .on('error', swallowError)
    //     .pipe(gulp.dest(output.stylesheets))
    //     .pipe(connect.reload())
    //     .pipe(wait(SFTPDelay))
    //     .pipe(livereload(reloadLive));

});

//HTML Task
// (watch HTML files for changes)
gulp.task('watch-html', function() {
    gulp.src(input.html)
        .pipe(wait(SFTPDelay))
        .pipe(livereload());
});

// ERROR Debug
// Console logs errors to terminal instead of crashing gulp
function swallowError (error) {
  // If you want details of the error in the console
  console.log(error.toString())
  this.emit('end')
}


// Execute ------------------------------

// Watch declared files for changes and run custom function
gulp.task('watch', function() {;﻿

    livereload.listen();
    gulp.watch(input.javascript, ['build-js']);
    gulp.watch(input.sass, ['build-css']);
    gulp.watch(input.html, ['watch-html']);

});

/* run the watch task when gulp is called without arguments */
gulp.task('default', ['build-js', 'build-css', 'watch', 'connect']);
