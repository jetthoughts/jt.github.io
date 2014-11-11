var gulp = require('gulp'),
  glob = require('glob'),
  cssmin = require('gulp-cssmin'),
  sourcemaps = require('gulp-sourcemaps'),
  uncss = require('gulp-uncss');

gulp.task('uncss', function() {
  gulp.src(['./css/*.css'])
    .pipe(uncss({
      html: glob.sync('./_site/**/*.html'),
      ignore: [/validation_wrap/, /invalid/, /icon_circle/, /portfolio/, /orbit/, /off-canvas/, /move\-left/, /inner\-wrap/],
      timeout: 2000
    }))
    .pipe(sourcemaps.init())
    .pipe(cssmin())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./out'));
});
