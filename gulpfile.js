/*|
| | [Declarations]
| | variables, includes and sources
|*/ 

var gulp            = require('gulp'),
    gutil           = require('gulp-util'),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglify'),
    sass            = require('gulp-sass'),
    watch           = require('gulp-watch'),
    sourcemaps      = require('gulp-sourcemaps'),
    connect         = require('gulp-connect'),
    livereload      = require('gulp-livereload'),
    wait            = require('gulp-wait'),
    plumber         = require('gulp-plumber'),
    SFTPDelay       = null,
    offlineDev      = true,
    reloadLive      = null,
    compileSingle   = true,

    // Add file types to the array.
    // You can add file types and/or specific paths

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

/*|
| | [Functions / Tasks]
|*/

/* Run live browser refresh */
gulp.task('connect', function() {
    connect.server({
        // livereload: true
    });
});

/*|
| | [Compile JS]
| | concat javascript files, minify if --type production.
|*/
gulp.task('build-js', function() {
    gulp.src(input.javascript)
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest(output.javascript))
        .pipe(wait(SFTPDelay))
        .pipe(livereload());
});

/*|
| | [Compile saved file]
| | compiles only the file saved.
|*/
gulp.task('build-css-single', function() {

    return watch('source/scss/**/*.scss', { ignoreInitial: false })
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest(output.stylesheets))
        .pipe(connect.reload())
        .pipe(wait(SFTPDelay))
        .pipe(livereload(reloadLive));
});

/*|
| | [Compile all]
| | compiles all scss files for project init.
|*/
gulp.task('build-css-all', function() {

    gulp.src('source/scss/**/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest(output.stylesheets))
        .pipe(connect.reload())
        .pipe(wait(SFTPDelay))
        .pipe(livereload(reloadLive));
});

/*|
| | [HTML Task]
| | reload on saving html file
|*/
gulp.task('watch-html', function() {
    gulp.src(input.html)
        .pipe(wait(SFTPDelay))
        .pipe(livereload());
});

/*|
| | [Custom function]
| | test js in terminal and such.
|*/
gulp.task('idle', function() {
    console.log('OK');
});

// ERROR Debug [Deprecated]
// Console logs errors to terminal instead of crashing gulp
function swallowError (error) {
  // If you want details of the error in the console
  console.log(error.toString())
  this.emit('end')
}


// Execute ------------------------------

// Watch declared files for changes and run custom function
gulp.task('watch', function() {

    livereload.listen();
    gulp.watch(input.javascript, ['build-js']);

    if (compileSingle === true) {
        gulp.watch(input.sass, ['build-css-single']);
    }
    else{
        gulp.watch(input.sass, ['build-css-all']);
    }

    gulp.watch(input.html, ['watch-html']);

});

/* run the watch task when gulp is called without arguments */
gulp.task('default', ['build-js', 'build-css-all', 'watch', 'connect']);
