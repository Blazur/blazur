var gulp     = require('gulp'),
    stylus   = require('gulp-stylus'),
    jshint   = require('gulp-jshint'),
    client   = require('tiny-lr')(),
    refresh  = require('gulp-livereload'),
    notify   = require('gulp-notify'),
    uglify   = require('gulp-uglify'),
    concat   = require('gulp-concat'),
    nodemon  = require('gulp-nodemon'),
    port     = 35728;

var paths = {
  scripts: 'client/app/**/*.js',
  stylus: 'client/styles/stylus/*.styl',
  html: ['client/app/**/*.html', 'index.html']
};

gulp.task('serve', function() {
  nodemon({'script': 'index.js', 'ignore': ['node_modules/**/*.**']})
    .on('restart', function() {
      refresh(client);
    });
});

gulp.task('liveReload', function() {
  client.listen(port, function(error) {
    if(error) {
      console.log(error);
    }
  });
});

gulp.task('stylus', function() {
  return gulp.src(paths.stylus)
    .pipe(stylus())
    .pipe(gulp.dest('client/styles/css/'))
    .pipe(refresh(client))
    .pipe(notify({message: 'CSS compiled!'}));
});

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter("jshint-stylish"))
    .pipe(refresh(client))
    .pipe(notify({message: 'JS compiled!'}));
});

gulp.task('html', function() {
  return gulp.src(paths.html)
    .pipe(refresh(client));
});

gulp.task('build', ['stylus', 'scripts']);

gulp.task('watch', function() {
  gulp.watch(paths.stylus, ['stylus']);
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.html, ['html']);
});

gulp.task('default', ['build', 'liveReload', 'serve', 'watch']);
