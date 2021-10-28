const fs = require('fs')
const cb = () => {}
let srcFonts = './src/styles/utils/_fonts.scss'
let appFonts = './build/fonts/'


const checkWeight = (fontName) => {
  let weight = 400
  switch (true) {
    case /Thin/.test(fontName):
      weight = 100
      break;
    case /ExtraLight/.test(fontName):
      weight = 200
      break;
    case /Light/.test(fontName):
      weight = 300
      break;
    case /Regular/.test(fontName):
      weight = 400
      break;
    case /Medium/.test(fontName):
      weight = 500
      break;
    case /SemiBold/.test(fontName):
      weight = 600
      break;
    case /Semi/.test(fontName):
      weight = 600
      break;
    case /Bold/.test(fontName):
      weight = 700
      break;
    case /ExtraBold/.test(fontName):
      weight = 800
      break;
    case /Heavy/.test(fontName):
      weight = 700
      break;
  }

  return weight
}

 const fontsStyle = (done) => {
  let file_content = fs.readFileSync(srcFonts)

  fs.writeFile(srcFonts, '', cb)
  fs.readdir(appFonts, function (err, items) {
    if (items) {
      let c_fontName
      for (var i = 0; i < items.length; i++) {
        let fontName = items[i].split('.')
        fontName = fontName[0]
        let font = fontName.split('-')[0]
        let weight = checkWeight(fontName)
        if (c_fontName !== fontName) {
          fs.appendFile(srcFonts, '@include font-face("' + font + '", "' + fontName + '", ' + weight + ');\r\n', cb)
        }
        c_fontName = fontName
      }
    }
  })

  done()
}

module.exports = fontsStyle
