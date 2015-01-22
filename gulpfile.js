var gulp = require('gulp'),
  imagemin = require('gulp-imagemin'),
  pngcrush = require('imagemin-pngcrush'),
  sourcemaps = require('gulp-sourcemaps'),
  shell = require('gulp-shell'),
  compass = require('gulp-compass'),
  uglifyjs = require('gulp-uglifyjs'),
  glob = require('glob'),
  cssmin = require('gulp-cssmin'),
  requireDir = require('require-dir'),
  htmlmin = require('gulp-minify-html');

var dir = requireDir('./tasks');

var assets = {
  "js"    : [
    "./bower_components/jquery/jquery.js",
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
      svgoPlugins: [
        {removeViewBox: false}
      ],
      use        : [pngcrush()]
    }))
    .pipe(gulp.dest('images'));
});

// minifies all images from image folder
// TODO reuse task imagemin
// was added because compass adds dprites to image folder after optimization
gulp.task('image-minify', function () {
  return gulp.src('images/**/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use        : [pngcrush()]
    }))
    .pipe(gulp.dest('images'));
});

gulp.task('compass', function () {
  gulp.src(assets.styles)
    .pipe(sourcemaps.init())
    .pipe(compass({
      config_file: './config.rb',
      css        : 'css',
      sass       : '_sass'
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css'));
});

gulp.task('uglify', function () {
  gulp.src(assets.js)
    .pipe(uglifyjs('app.min.js', {
      outSourceMap: true
    }))
    .pipe(gulp.dest('./js'))
});

gulp.task('watch', function () {
  gulp.watch(assets.js, ['uglify']);
  gulp.watch(assets.styles, ['compass']);
});

gulp.task('minifyhtml', function(){
  var opts = {comments:true,spare:true};
  gulp.src('_site/**/*.html')
      .pipe(htmlmin())
      .pipe(gulp.dest('_site'))
});

gulp.task('jekyll', shell.task('jekyll serve -w'));

gulp.task('default', ['watch', 'jekyll', 'uglify', 'compass']);

gulp.task('minify', ['imagemin', 'uglify', 'compass', 'uncss']);

// grunt tatsks for gulp
require('gulp-grunt')(gulp, {
  base: null,
  prefix: 'grunt-',
});

gulp.task('wpt_pagespeed', function() {
  gulp.run('grunt-wpt');
})

gulp.task('pagespeed', function() {
  gulp.run('grunt-pagespeed');
})
