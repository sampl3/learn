var  gulp = require('gulp');
var serve = require('gulp-serve');

gulp.task('serve',  serve('app'));

var shell=require('gulp-shell');
var util=require('gulp-util');
var args = require('yargs').argv;
gulp.task('a', function () {
  return gulp.src('app/**/*.' + util.env.suffix, {read: false})
    .pipe(shell([
      'echo  <%= f(file.path) %>',
      'ls -l <%= file.path %>'
    ], {
      templateData: {
        f: function (s) {
          return s.replace(/$/, '.bak')
        }
      }
    }))
})
