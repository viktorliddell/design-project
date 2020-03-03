module.exports = function () {
  $.gulp.task('build', $.gulp.series('clean', 'copy', 'sass', 'scripts', 'libs', 'css', 'images', 'svg'));
};

