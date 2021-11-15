const gulp = require('gulp')
const fontsStyle = require('./gulp/tasks/fontsStyle')
const serve = require('./gulp/tasks/serve')
const htmlInclude = require('./gulp/tasks/htmlInclude')
const htmlMinify = require('./gulp/tasks/htmlMinify')
const styles = require('./gulp/tasks/styles')
const script = require('./gulp/tasks/script')
const fonts = require('./gulp/tasks/fonts')
const imageMinify = require('./gulp/tasks/imageMinify')
const clean = require('./gulp/tasks/clean')
const copyDependencies = require('./gulp/tasks/copyDependencies')
const lighthouse = require('./gulp/tasks/lighthouse')
const svgSprite = require('./gulp/tasks/svgSprite')

function setMode(isProduction = false) {
  return cb => {
    process.env.NODE_ENV = isProduction ? 'production' : 'development'
    cb()
  }
}

const dev = gulp.series(clean, copyDependencies, gulp.parallel(htmlInclude, fonts, script, imageMinify), svgSprite, fontsStyle, styles)
const build = gulp.series(clean, copyDependencies, gulp.parallel(htmlInclude, htmlMinify, fonts, script, imageMinify), svgSprite, fontsStyle, styles)

module.exports.start = gulp.series(setMode(), dev, serve)
module.exports.build = gulp.series(setMode(true), build)

module.exports.lighthouse = gulp.series(lighthouse)
