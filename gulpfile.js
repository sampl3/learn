var requireDir = require('require-dir');
var dir = requireDir('./gulp');

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var shell = require('gulp-shell');

gulp.task('default',['build']);

gulp.task('clean', shell.task([
    'rm -r dist'
]));

gulp.task('build',[], function(){
    return gulp.src('app/*.js')
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist'));
});
