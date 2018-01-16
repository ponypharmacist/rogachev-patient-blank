var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs');
    jade = require('jade');
    gulpJade = require('gulp-jade');

// Все таски есть в гугле. Ищем, добавляем.

// Собираем стили
gulp.task('sass', function() {
  return gulp.src('app/sass/*.sass') // 'app/sass/**/*.sass' / ['!app/sass/exclude.sass', '!app/sass/also-exclude.sass']
  .pipe(sass())
  .pipe(gulp.dest('app/css')) // Нельзя писать файл, тока папку
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('jade', function () {
  return gulp.src('app/jade/alt-index.jade')
    .pipe(gulpJade({
      jade: jade,
      pretty: true
    }))
    .pipe(gulp.dest('app/'))
})

gulp.task('scripts', function() { // Если я хочу библиотеки левые сжать и добавить в js-папку например
  return gulp.src([
    'app/js/jquery-3.2.1.js'
  ])
  .pipe(concat('libs.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('app/js'));
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  });
});
                  // Тут перечислены таски, выполняемые до запуска watch
gulp.task('watch', ['browser-sync', 'sass', 'jade'], function() {
  gulp.watch('app/sass/**/*.sass', ['sass']);
  gulp.watch('app/jade/**/*.jade', ['jade']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});
