var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');
 
var tsProject = ts.createProject({
    declaration: true,
    noExternalResolve: false
});
var tsProjectMain = ts.createProject({
    declaration: true,
    noExternalResolve: false
});
var tsProjectPublic = ts.createProject({
    declaration: true,
    noExternalResolve: false
});
 
gulp.task('scripts', function() {
    var tsResult = gulp.src('routes/*.ts')
        .pipe(ts(tsProject));
 
    return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done. 
        tsResult.dts.pipe(gulp.dest('routes/defs')),
        tsResult.js.pipe(gulp.dest('routes/'))
    ]);
});
gulp.task('main', function() {
    var tsResult = gulp.src('app.ts')
        .pipe(ts(tsProjectMain));
 
    return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done. 
        tsResult.dts.pipe(gulp.dest('./')),
        tsResult.js.pipe(gulp.dest('./'))
    ]);
});
 
gulp.task('public', function() {
    var tsResult = gulp.src('public/ts/*.ts')
        .pipe(ts(tsProjectPublic));
 
    return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done. 
        tsResult.dts.pipe(gulp.dest('public/ts/defs')),
        tsResult.js.pipe(gulp.dest('public/js'))
    ]);
});

 
var sass = require('gulp-sass');
 
gulp.task('sass', function () {
  return gulp.src('./public/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});
gulp.task('watch', ['scripts'], function() {
    gulp.watch('routes/*.ts', ['scripts']);
});
gulp.task('watch', ['main'], function() {
    gulp.watch('routes/*.ts', ['main']);
});
gulp.task('watch', ['public'], function() {
    gulp.watch('public/ts/*.ts', ['public']);
});

gulp.task('default', ['scripts','main','public','sass']);
