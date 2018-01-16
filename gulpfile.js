var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs');

/*
Все таски есть в гугле. Ищем, добавляем.

gulp.task('taskname', function() { // Вызывается через консоль: gulp taskname
  console.log('Hello gulp.');
  return gulp.src('source-files')
  .pipe(plugin())
  .pipe(gulp.dest('folder'))
});

gulp.task('taskname', function() {

});

*/

// Собираем стили
gulp.task('sass', function() {
  return gulp.src('app/sass/*.sass') // 'app/sass/**/*.sass' / ['!app/sass/exclude.sass', '!app/sass/also-exclude.sass']
  .pipe(sass())
  .pipe(gulp.dest('app/css')) // Нельзя писать файл, тока папку
  .pipe(browserSync.reload({stream: true}))
});

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
gulp.task('watch', ['browser-sync', 'sass'], function() {
  gulp.watch('app/sass/**/*.sass', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});
