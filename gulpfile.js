var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglifyjs'),
    jade = require('jade'),
    gulpJade = require('gulp-jade');

// Все таски есть в гугле. Ищем, добавляем.

// Собираем стили
gulp.task('sass', function() {
  return gulp.src('app/sass/*.sass') // 'app/sass/**/*.sass' / ['!app/sass/exclude.sass', '!app/sass/also-exclude.sass']
  .pipe(sass())
  .pipe(gulp.dest('app/css')); // Нельзя писать файл, тока папку
});

gulp.task('css', function () {
  return gulp.src('app/css/*.css')
  .pipe(concat('main.css'))
  .pipe(gulp.dest('build/css'))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('jade', function () {
  return gulp.src('app/jade/*.jade')
    .pipe(gulpJade({
      jade: jade,
      pretty: true
    }))
    .pipe(gulp.dest('build/'))
});

gulp.task('scripts', function() { // Если я хочу библиотеки левые сжать и добавить в js-папку например
  return gulp.src([
    'app/js/jquery-3.3.1.min.js', 'app/js/tables-bot.js', 'app/js/tables-antropo.js',
    'app/js/app-interface.js', 'app/js/app-antropo.js', 'app/js/app-bot.js',
    'app/js/app-import-patient.js', 'app/js/app-import-txt.js'
  ])
  .pipe(concat('app.js'))
  .pipe(gulp.dest('build/js'));
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'build'
    },
    notify: false
  });
});
                  // Тут перечислены таски, выполняемые до запуска watch
gulp.task('watch', ['browser-sync', 'scripts', 'sass', 'css', 'jade'], function() {
  gulp.watch('app/sass/**/*.sass', ['sass']);
  gulp.watch('app/jade/**/*.jade', ['jade']);
  gulp.watch('build/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});
