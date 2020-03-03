global.$ = {
  gulp: require('gulp'),
  gp:   require('gulp-load-plugins')(),
  browserSync: require('browser-sync').create(),
  imageminJpegRecompress: require('imagemin-jpeg-recompress'),
  pngquant: require('imagemin-pngquant'),
  del: require('del'),
  path: {
    config: require('./gulp/config.js'),
    jquery: './libs/jquery.js',
    scrollOverflow: './libs/scrolloverflow.js',
    libs_js: './libs/**/*.js',
    js: './js/**/*.js',
    css: 'css/**/*.css'
  }
};

$.path.config.forEach(function(path) {
  require(path)();
});