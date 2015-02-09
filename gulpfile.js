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
  htmlmin = require('gulp-minify-html'),
  browserSync = require('browser-sync'),
  newer = require('gulp-newer'),
  flatten = require('gulp-flatten');

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
  "self_scripts": [
    "./javascripts/webfont_config.js",
    "./javascripts/hide_swipe.js",
    "./javascripts/foundation_init.js",
    "./javascripts/fastclick_init.js",
    "./javascripts/contact.js",
    "./javascripts/portfolio_sorter.js",
    "./javascripts/portfolio_heights.js"
  ],
  'landing_scripts':[
    "./bower_components/jquery/jquery.js",
    "./javascripts/contact.js"
  ],
  "styles"      : "./_sass/**/*.scss",
  "site_styles" : ["./_site/css/app.css", "./_site/css/landing.css"],
  'fonts': [
    '_sass/fonts/socicon/*.*'
  ]
};

gulp.task('imagemin', function () {
  return gulp.src('source_images/**/*')
    .pipe(newer('images'))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [
        {removeViewBox: false}
      ],
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

gulp.task('compass-stylefix', function () {
  gulp.src(assets.styles)
    .pipe(sourcemaps.init())
    .pipe(compass({
      config_file: './config.rb',
      css        : 'css',
      sass       : '_sass'
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./_site/css'));
});


gulp.task('uglify', function () {
  gulp.src(assets.js)
    .pipe(uglifyjs('app.min.js', {
      outSourceMap: true
    }))
    .pipe(gulp.dest('./js'))
});

gulp.task('uglify-landing', function () {
  gulp.src(assets.landing_scripts)
    .pipe(uglifyjs('lp.min.js', {
      compress: false,
      outSourceMap: true,
      basePath: './'
    }))
    .pipe(gulp.dest('./js'))
});

gulp.task('watch', function () {
  gulp.watch(assets.js, ['uglify', 'uglify-landing', browserSync.reload]);
  gulp.watch(assets.styles, ['compass']);
});

gulp.task('watch-stylefix', function () {
  gulp.watch(assets.js, ['uglify', browserSync.reload]);
  gulp.watch(assets.styles, ['compass-stylefix']);
  gulp.watch(assets.site_styles, ['', browserSync.reload]);
});

var jscs = require('gulp-jscs');

gulp.task('jscs', function () {
  return gulp.src(assets.self_scripts)
    .pipe(jscs({'preset':'airbnb'}));
});

gulp.task('browser-sync', function() {
  browserSync({
    proxy: "localhost:4000"
  });
});

gulp.task('minifyhtml', function(){
  var opts = {comments:true,spare:true};
  gulp.src('_site/**/*.html')
      .pipe(htmlmin())
      .pipe(gulp.dest('_site'))
});

gulp.task('browser-sync-site', function () {
  browserSync({
    server: {
      baseDir: "./_site/"
    }
  });
});

gulp.task('copy-fonts', function() {
  gulp.src(assets.fonts, {base: '.'})
    .pipe(flatten())
    .pipe(gulp.dest('css/fonts/'))
});

// This task for stylefixes only (it serves html files from _site/ dir and not run jekyll)
gulp.task('stylefix', ['browser-sync-site', 'watch-stylefix']);

gulp.task('jekyll',['browser-sync'], shell.task('jekyll serve -w'));

gulp.task('default', ['copy-fonts', 'watch', 'jekyll', 'uglify', 'compass']);

gulp.task('minify', ['imagemin', 'uglify', 'compass', 'uncss']);

// grunt tasks for gulp
require('gulp-grunt')(gulp, {
  base: null,
  prefix: 'grunt-'
});

gulp.task('wpt_pagespeed', function() {
  gulp.run('grunt-wpt');
})

gulp.task('pagespeed', function() {
  gulp.run('grunt-pagespeed');
})
