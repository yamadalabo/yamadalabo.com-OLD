"use strict"

import gulp from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

gulp.task('build', () => {
  browserify('./index.js', {debug: true})
    .transform(babelify)
    .bundle()
    .on('error', err => {
      console.log('Error :' + err.message);
    })
    .pipe(source('index.js'))
    .pipe(gulp.dest('./dist/js/'))
});

// gulp.task('build', () => {
//   browserify('./es6/index.js', {debug: true})
//     .transform(babelify)
//     .bundle()
//     .on('error', err => {
//       console.log('Error :' + err.message);
//     })
//     .pipe(source('index.js'))
//     .pipe(buffer())
//     .pipe(uglify())
//     .pipe(gulp.dest('./dist/js/'))
// });
