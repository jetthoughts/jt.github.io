var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var pngcrush = require('imagemin-pngcrush');
var sourcemaps = require('gulp-sourcemaps');

var assets = {
  "js": [
    "./bower_components/modernizr/modernizr.js",
    "./bower_components/components-webfontloader/webfont.js",
    "./javascripts/webfont_config.js",
    "./bower_components/foundation/js/foundation/foundation.js",
    "./bower_components/foundation/js/foundation/foundation.accordion.js",
    "./bower_components/foundation/js/foundation/foundation.topbar.js",
    "./bower_components/foundation/js/foundation/foundation.orbit.js",
    "./bower_components/foundation/js/foundation/foundation.offcanvas.js",
    "./bower_components/fastclick/lib/fastclick.js",
    "./javascripts/hide_swipe.js",
    "./javascripts/foundation_init.js",
    "./javascripts/fastclick_init.js",
    "./javascripts/contact.js",
    "./javascripts/portfolio_sorter.js",
    "./javascripts/portfolio_heights.js"
  ],
  "styles": "./_sass/**/*.scss"
};

gulp.task('imagemin', function () {
  return gulp.src('source_images/**/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngcrush()]
    }))
    .pipe(gulp.dest('images'));
});


var compass = require('gulp-compass');

gulp.task('compass', function() {
  gulp.src(assets.styles)
    .pipe(sourcemaps.init())
      .pipe(compass({
        config_file: './config.rb',
        css: 'css',
        sass: '_sass'
      }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css'));
});


var uglifyjs = require('gulp-uglifyjs');

gulp.task('uglify', function() {
  gulp.src(assets.js)
    .pipe(uglifyjs('app.min.js', {
      outSourceMap: true
    }))
    .pipe(gulp.dest('./js'))
});