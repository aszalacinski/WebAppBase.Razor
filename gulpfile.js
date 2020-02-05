/// <binding AfterBuild='css, watch' Clean='clean' />
/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var postcss = require('gulp-postcss');
var gulp = require('gulp');
var del = require('del');
var ts = require('gulp-typescript');
var merge = require('merge2');

const { watch } = require('gulp');

var paths = {
    scripts: ['scripts/**/*.js', 'scripts/**/*.ts', 'scripts/**/*.map'],
};

gulp.task('clean', function () {
    return del(['wwwroot/js/**/*', 'wwwroot/css/**/*']);
});

//gulp.task('default', function () {
//    gulp.src(paths.scripts).pipe(gulp.dest('wwwroot/js'))
//});

gulp.task('css', function () {
    postcss = require('gulp-postcss');

    return gulp.src(['scripts/css/styles.css'])
        .pipe(postcss([
            require('postcss-import'),
            require('tailwindcss')('tailwind.config.js'),
            require('autoprefixer')
        ]))
        .pipe(gulp.dest('wwwroot/css/'))
});

var tsProject = ts.createProject('scripts/tsconfig.json');

gulp.task('js', function () {
    return gulp.src(['scripts/src/**/*.ts'])
        .pipe(tsProject())
        .pipe(gulp.dest('wwwroot/js/'));
});

gulp.task('watch', gulp.parallel('js', 'css'));
