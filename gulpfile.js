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
 
gulp.task('watch', ['scripts'], function() {
    gulp.watch('routes/*.ts', ['scripts']);
});
gulp.task('watch', ['main'], function() {
    gulp.watch('routes/*.ts', ['main']);
});

gulp.task('default', ['scripts','main']);
