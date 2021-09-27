const {src, dest, series, watch} = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const csso = require('gulp-csso')
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const sync = require('browser-sync').create()
const rename = require('gulp-rename')
const image = require('gulp-image')

function html() {
  return src('src/**.html')
    .pipe(include({
      prefix: '@@'
    }))
    .pipe(dest('docs'))
    // .pipe(htmlmin({
    //   collapseWhitespace: true
    // }))
    // .pipe(rename({ extname: '.min.html' }))
    // .pipe(dest('docs'))
}

function scss() {
  return src('src/scss/**.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(concat('index.css'))
    .pipe(dest('docs/css'))
    .pipe(csso())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest('docs/css'))
}

function js() {
  return src('src/js/**.js')
    .pipe(dest('docs/js'))
}

function img() {
  return src('src/img/*')
    .pipe(image())
    .pipe(dest('docs/img'))
}

function font() {
  return src('src/fonts/**/*.{woff,ttf,svg}')
    .pipe(dest('docs/fonts'))
}

function clear() {
  return del('docs')
}

function serve() {
  sync.init({
    server: './docs'
  })

  watch('src/**.html', series(html)).on('change', sync.reload)
  watch('src/scss/**.scss', series(scss)).on('change', sync.reload)
  watch('src/js/**.js', series(js)).on('change', sync.reload)
}

exports.build = series(clear, scss, html, img, font, js)
exports.serve = series(clear, scss, html, img, font, js, serve)
exports.clear = clear