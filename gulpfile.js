
/*|
| | [Current NPM Dependancies]
| |
| | - 'gulp' (Runs Gulp)
| | - 'gulp-concat' (Concatenate multiple files) - [npm install --save-dev gulp-concat]
| | - 'gulp-uglify' (Minifies JavaScript) - [npm install --save-dev gulp-uglify]
| | - 'gulp-sass' (Compiles SASS / SCSS etc) - [npm install node-sass gulp-sass --save-dev]
| | - 'gulp-watch' (Watches files for changes) - [npm install --save-dev gulp-watch]
| | - 'gulp-sourcemaps' (Inline source maps are embedded in the compiled file) - [npm install --save-dev gulp-sourcemaps]
| | - 'gulp-connect' (Gulp plugin to run a webserver (with LiveReload)) - [npm install --save-dev gulp-connect]
| | - 'gulp-livereload' (livereload chrome extension) - [npm install --save-dev gulp-livereload]
| | - 'gulp-wait' (Delay before calling the next function in a chain) - [npm install --save-dev gulp-wait]
| | - 'gulp-plumber' (Prevent pipe breaking caused by errors from gulp plugins) - [npm install --save-dev gulp-plumber]
|*/ 

/*|
| | [Declarations]
| | variables, modules, includes and sources
|*/ 

var gulp            = require('gulp'),
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
      'html': 'source/html/**/*.html'
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
gulp.task('build-js', function(done) {

    gulp.src(input.javascript)
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest(output.javascript))
        .pipe(wait(SFTPDelay))
        .pipe(livereload());

    done();
});

/*|
| | [Compile saved file]
| | compiles only the file saved.
|*/
gulp.task('build-css-single', function(done) {

    return watch('source/scss/**/*.scss', { ignoreInitial: false })
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest(output.stylesheets))
        .pipe(connect.reload())
        .pipe(wait(SFTPDelay))
        .pipe(livereload(reloadLive));

    done();
});

/*|
| | [Compile all]
| | compiles all scss files for project init.
|*/
gulp.task('build-css-all', function(done) {

    gulp.src('source/scss/**/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest(output.stylesheets))
        .pipe(connect.reload())
        .pipe(wait(SFTPDelay))
        .pipe(livereload(reloadLive));

    done();
});

/*|
| | [HTML Task]
| | reload on saving html file
|*/
gulp.task('refresh-html-chop', function(done) {

    gulp.src(input.html)
        .pipe(wait(SFTPDelay))
        .pipe(livereload());

    done();
});

/*|
| | [Debug function]
| | test js in terminal and such.
|*/
gulp.task('idle', function(done) {

    console.log('OK');

    done();
});

/*|
| | [Messages]
| | test js in terminal and such.
|*/
gulp.task('message', function() { 

  return new Promise(function(resolve, reject) {
    console.log("HTTP Server Started");
    resolve();
  });

});


/*|
| | [Watch]
| | Enable automatic compiling on save
|*/
gulp.task('watch', function(done) {

    livereload.listen();

    gulp.watch(input.javascript, gulp.series('build-js'));

    if (compileSingle === true) {
        gulp.watch(input.sass, gulp.series('build-css-single'));
    }
    else{
        gulp.watch(input.sass, gulp.series('build-css-all'));
    }

    gulp.watch(input.html, gulp.series('refresh-html-chop'));

    done();
});


/* run the watch task when gulp is called without arguments */
gulp.task('default', gulp.parallel('build-js', 'build-css-all', 'watch', 'connect'));