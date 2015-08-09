var  gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('nodered', shell.task([
    'node node_modules/node-red/red.js nodered/flow.json'
    ]));