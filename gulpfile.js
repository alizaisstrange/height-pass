const {src, dest, series, watch} = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefixes = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const notify = require("gulp-notify");
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');

const styles = () => {
  return src('src/css/**/*.css')
  .pipe(concat('styles.css'))
  .pipe(autoprefixes({
    cascade: false
  }))
  .pipe(cleanCSS({
    level: 1
  }))
  .pipe(dest('dist/css'))
  .pipe(browserSync.stream())
};

const media = () => {
  return src('src/media/**/*.css')
  .pipe(concat('media.css'))
  .pipe(autoprefixes({
    cascade: false
  }))
  .pipe(cleanCSS({
    level: 1
  }))
  .pipe(dest('dist/css'))
  .pipe(browserSync.stream())
};

const sprite = () => {
  return src('src/sprite.svg')
  .pipe(dest('dist/'))
};

const favicon = () => {
  return src('src/favicon.svg')
  .pipe(dest('dist/'))
};

const images = () => {
  return src('src/img/**/*.*')
  .pipe(dest('dist/img'))
};

const fonts = () => {
  return src('src/fonts/*.*')
  .pipe(dest('dist/fonts/'))
};

// const htmlMinify = () => {
//   return src('src/**/*.html')
//   .pipe(htmlMin({
//     collapseWhitespace: true,
//   }))
//   .pipe(dest('dist/'))
//   .pipe(browserSync.stream())
// };

const scripts = () => {
  return src ([
    'src/js/**/*.js'
  ])
  .pipe(babel({
    presets: ['@babel/preset-env']
  }))
  .pipe(concat('script.js'))
  .pipe(uglify().on('error', notify.onError()))
  .pipe(dest('dist/js'))
  .pipe(browserSync.stream())
}

const pugDev = () => {
  return src('./src/*.pug')
  .pipe (
    pug({
      //pretty: true
    })
  )
  .pipe(dest('dist/'))
  .pipe(browserSync.stream())
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
}

// watch('src/**/*.html', htmlMinify);
watch('src/css/**/*.css', styles);
watch('src/media/**/*.css', media);
watch('src/js/**/*.js', scripts);
watch('src/*.pug', pugDev);

exports.styles = styles;
exports.media = media;
// exports.htmlMinify = htmlMinify;
exports.scripts = scripts;
exports.pugDev = pugDev;
exports.images = images;
exports.sprite = sprite;
exports.favicon = favicon;
exports.fonts = fonts;
exports.default = series(styles, media, images, sprite, favicon, fonts, scripts, pugDev, watchFiles);