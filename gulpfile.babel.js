import gulp from 'gulp';
import gutil from 'gulp-util';
import connect from 'gulp-connect';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

import browserify from 'browserify';
import uglify from 'gulp-uglify';
import babelify from 'babelify';
import env from 'gulp-env';
import envify from 'envify';
import sass from 'gulp-sass';

const paths = {
  index: './assets/js/index.js',
  test: './assets/js/test/**/*.js',
};

gulp.task('connect', () => {
  connect.server({
    liveReload: true,
  });
});

gulp.task('build:js:dev', () => {
  const envs = env.set({
    NODE_ENV: 'development',
  });
  browserify(paths.index, { debug: true })
    .transform(envify)
    .transform(babelify)
    .bundle()
    .pipe(envs.reset)
    .on('error', gutil.log)
    .pipe(source('index.js'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('build:js:prod', () => {
  const envs = env.set({
    NODE_ENV: 'production',
  });
  browserify(paths.index, { debug: false })
    .transform(envify)
    .transform(babelify)
    .bundle()
    .pipe(envs.reset)
    .on('error', gutil.log)
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('watch:js', () => {
  const watchList = [
    './assets/js/actions/**',
    './assets/js/components/**',
    './assets/js/constants/**',
    './assets/js/containers/**',
    './assets/js/sagas/**',
    './assets/js/services/**',
    './assets/js/reducers/**',
    './assets/js/store/**',
    './assets/js/test/**',
  ];
  gulp.watch(watchList, ['test', 'build:js:dev']);
});

gulp.task('build:sass', () =>
  gulp.src('./assets/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
);

gulp.task('watch:sass', () => {
  gulp.watch('./assets/scss/**/*.scss', ['build:sass']);
});
