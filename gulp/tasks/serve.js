const gulp = require('gulp')

const imageMinify = require('./imageMinify')
const fonts = require('./fonts')
const fontsStyles = require('./fontsStyle')
const svgSprite = require('./svgSprite')
const styles = require('./styles')
const htmlInclude = require('./htmlInclude.js')
const script = require('./script')
const copyDependencies = require('./copyDependencies')

const server = require('browser-sync').create()

function readyReload(cb) {
  server.reload()
  cb()
}

module.exports = function serve(cb) {
    server.init({
        server: 'build',
        notify: false,
        open: true,
        cors: true
    })

    gulp.watch('src/img/*.{gif,png,jpg,jpeg,svg,webp}', gulp.series(imageMinify, readyReload))
    gulp.watch('src/img/sprite/*.svg', gulp.series(svgSprite, readyReload))
    gulp.watch('src/styles/**/*.scss', gulp.series(styles, cb => gulp.src('build/css').pipe(server.stream()).on('end', cb)))
    gulp.watch('src/js/**/*.js', gulp.series(script, readyReload))
    gulp.watch('src/fonts/**.ttf', gulp.series(fonts, readyReload))
    gulp.watch('src/fonts/**.ttf', gulp.series(fontsStyles, readyReload))
    gulp.watch('src/pages/**/*.html', gulp.series(htmlInclude, readyReload))

    gulp.watch('package.json', gulp.series(copyDependencies, readyReload))

    return cb()
}
