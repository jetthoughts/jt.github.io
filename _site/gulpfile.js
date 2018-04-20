const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const pngcrush = require('imagemin-pngcrush');

gulp.task('default', () =>
gulp.src('_images/**/*')
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [
      {removeViewBox: false}
    ],
    use        : [pngcrush()]
  }))
  .pipe(gulp.dest('_assets/images/'))
);
