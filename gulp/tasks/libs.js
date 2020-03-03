const jsfiles = [
  $.path.jquery,
  $.path.scrollOverflow,
  $.path.libs_js
];

module.exports = function () {
  $.gulp.task('libs', function() {
    return $.gulp.src(jsfiles)
        .pipe($.gp.plumber())
        .pipe($.gp.sourcemaps.init())
        .pipe($.gp.concat('all.js'))
        .pipe($.gp.rename('libs.js'))
        .pipe($.gp.sourcemaps.write(''))
        .pipe($.gulp.dest('build/js'))
        .pipe($.browserSync.stream());
  });
};