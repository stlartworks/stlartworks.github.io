var gulp          = require('gulp');
var sass          = require('gulp-sass');
var please        = require('gulp-pleeease');
var sourcemaps    = require('gulp-sourcemaps');
var evilIcons     = require("gulp-evil-icons");
var browserSync   = require('browser-sync');
var reload        = browserSync.reload;
var cp            = require('child_process');

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

var pleaseOptions  = {
  autoprefixer: {
    browsers: ['ie >= 8', 'ie_mob >= 10', 'ff >= 3.6', 'chrome >= 10', 'safari >= 5.1', 'opera >= 11', 'ios >= 7', 'android >= 4.1', 'bb >= 10']
  },
  filters: true,
  rem: true,
  pseudoElements: true,
  opacity: true,

  import: true,
  minifier: true,
  mqpacker: true,

  sourcemaps: false,

  next: {
    calc: false,
    customProperties: false,
    customMedia: false,
    colors: false
  }
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
  browserSync.notify(messages.jekyllBuild);
  return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
    .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
  browserSync({
    server: {
      baseDir: '_site'
    }
  });
});

gulp.task('sass', function () {
  return gulp.src('./_sass/style.sass') // path to your sass
    .pipe(sourcemaps.init())
    .pipe(sass({
        //errLogToConsole: true,
        onError: browserSync.notify,
        indentedSyntax: true,
        includePaths : ['./_sass/']
      }))
    .pipe(sourcemaps.write())
    .pipe(please(pleaseOptions))
    .pipe(gulp.dest('_site/'))
    .pipe(reload({ stream: true }))
    .pipe(gulp.dest('./')); // Output to the root of your theme directory
});


gulp.task('sassprod', function () {
  return gulp.src('./_sass/style.sass') // path to your sass
    .pipe(sass({
        //errLogToConsole: true,
        onError: browserSync.notify,
        indentedSyntax: true,
        includePaths : ['./_sass/']
      }))
    .pipe(please(pleaseOptions))
    .pipe(gulp.dest('_site/'))
    .pipe(gulp.dest('./')); // Output to the root of your theme directory
});


/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('./_sass/**/*.{sass,scss}', ['sassprod']);
    gulp.watch([
      'index.html',
      './*.md',
      './**/*.yml',
      '_layouts/*.html',
      '_includes/*.html',
      '_posts/*'
    ], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
