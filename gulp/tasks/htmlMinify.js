const gulp = require('gulp')
const htmlMin = require('gulp-htmlmin')

module.exports = function htmlMinify() {
  return gulp.src('build/**/*.html')
    .pipe(htmlMin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('build'));
}
