var gulp = require('gulp')
  , imagemin = require('gulp-imagemin')
  , pngcrush = require('imagemin-pngcrush')
  , sourcemaps = require('gulp-sourcemaps')
  , shell = require('gulp-shell')
  , compass = require('gulp-compass')
  , uglifyjs = require('gulp-uglifyjs');

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

gulp.task('jekyll', shell.task('jekyll serve -w'));

gulp.task('default', ['watch', 'jekyll', 'uglify', 'compass']);

gulp.task('uncss', function() {
  var uncss = require('uncss'), css_path = '../../../../../../css/', files_root = 'http://localhost:4000/';
  var stylesheets = ['app.css', '404.css', 'ie.css', 'print.css', 'syntax.css',
          'fonts/awesome/scss/font-awesome-ie7.css', 'fonts/awesome/scss/font-awesome.css'],
      files = ['index.html', 'portfolio.html', 'team.html', 'career.html', 'work.html', 'blog/index.html',
          'contact.html', '/categories/tricks.html'],
      options = {
          stylesheets  : stylesheets,
          timeout      : 1000
      };

  for (i = 0; i < stylesheets.length; i++) {
      stylesheets[i] = (css_path + stylesheets[i]);
  }

  for (i = 0; i < files.length; i++) {
      files[i] = (files_root + files[i]);
  }

  uncss(files, options, function (error, output) {
      var fs = require('fs');
      fs.writeFile('cleaned_app_styles.css', output, function(err) {
          if(err) {
              console.log(err);
          } else {
              console.log("The file was saved!");
          }
      });
      console.log(output);
  });

});
