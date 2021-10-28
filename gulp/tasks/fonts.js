const gulp = require('gulp')
const ttf2woff2 = require('gulp-ttf2woff2')

module.exports = function fonts() {
  return gulp.src('src/fonts/**.ttf')
    .pipe(ttf2woff2())
    .pipe(gulp.dest('build/fonts'))
}


