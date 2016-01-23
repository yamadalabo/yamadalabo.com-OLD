import gulp from 'gulp';
import gutil from 'gulp-util';
import connect from 'gulp-connect';
import uglify from 'gulp-uglify';
import env from 'gulp-env';
import browserify from 'browserify';
import babelify from 'babelify';
import espower from 'gulp-espower';
import mocha from 'gulp-mocha';
import sass from 'gulp-sass';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

const paths = {
  index: './assets/js/index.js',
  test: './assets/js/test/**/*.js',
  poweredTest: './assets/js/powered-test/**/*.spec.js',
  poweredTestDist: './assets/js/powered-test/',
};

gulp.task('build:js:dev', () => {
  const envs = env.set({
    NODE_ENV: 'development',
  });
  browserify(paths.index, { debug: true })
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
    .transform(babelify)
    .bundle()
    .pipe(envs.reset)
    .on('error', gutil.log)
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('build:sass', () => {
  return gulp.src('./assets/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('connect', () => {
  connect.server({
    liveReload: true,
  });
});

gulp.task('power-assert', () => {
  return gulp.src(paths.test)
    .pipe(espower())
    .pipe(gulp.dest(paths.poweredTestDist));
});

gulp.task('test', ['power-assert'], () => {
  return gulp.src(paths.poweredTest)
    .pipe(mocha({
      require: ['./assets/js/test/setup.js'],
      timeout: 20000,
    }));
});

gulp.task('watch:test', () => {
  const watchList = [
    './assets/js/actions/**',
    './assets/js/components/**',
    './assets/js/constants/**',
    './assets/js/containers/**',
    './assets/js/middleware/**',
    './assets/js/reducers/**',
    './assets/js/store/**',
    './assets/js/test/**',
  ];
  gulp.watch(watchList, ['test']);
});
