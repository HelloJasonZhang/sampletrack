/*!
* gulp
* $ npm install gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del browser-sync --save-dev
*/


// Load plugins
var gulp = require('gulp'),
sass = require('gulp-ruby-sass'),
autoprefixer = require('gulp-autoprefixer'),
minifycss = require('gulp-minify-css'),
jshint = require('gulp-jshint'),
uglify = require('gulp-uglify'),
imagemin = require('gulp-imagemin'),
rename = require('gulp-rename'),
concat = require('gulp-concat'),
notify = require('gulp-notify'),
cache = require('gulp-cache'),
//livereload = require('gulp-livereload'),
browserSync = require('browser-sync'),
browserReload = browserSync.reload,
del = require('del');




// Scripts
gulp.task('scripts', function() {
    return gulp.src('./routes/*.js')
    .pipe(jshint( '.jshintrc'))
    //.pipe(jshint.reporter( 'default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('build/scripts'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('build/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Clean
gulp.task('clean', function(cb) {
    del([ 'build/scripts'], cb)
});

// Initialize browser-sync which starts a static server also allows for
// browsers to reload on filesave
gulp.task('browser-sync', function () {
   var files = [
      'app/**/*.html',
      'app/assets/css/**/*.css',
      'app/assets/imgs/**/*.png',
      'app/assets/js/**/*.js'
   ];

   browserSync.init(files, {
      server: {
         baseDir: './app'
      }
   });
});

// Function to call for reloading browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});


// Watch
gulp.task('watch', function() {
    // Watch .js files
    gulp.watch('src/scripts/**/*.js', ['scripts']);
});


// Default task
gulp.task('default', ['clean',  'bs-reload', 'browser-sync'], function() {
  //gulp.start(['scripts', 'bs-reload']);
  //gulp.watch(['*.*','./**/*.jade','./build/scripts/*.js'], ['bs-reload']);
});

