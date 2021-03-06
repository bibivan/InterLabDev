const gulp = require('gulp')
const plumber = require('gulp-plumber')
const fileInclude = require('gulp-file-include')
const htmlValidator = require('gulp-w3c-html-validator')
const bemValidator = require('gulp-html-bem-validator')
const config = require('../config')

module.exports = function htmlInclude() {
  return gulp.src('src/pages/*.html')
    .pipe(plumber())
    .pipe(fileInclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(htmlValidator())
    .pipe(bemValidator())
    .pipe(gulp.dest('build'))
}

