var gulp = require('gulp');
var webserver = require('gulp-webserver');
var proxy = require('http-proxy-middleware');
var exec = require('child_process').exec;
var tslint = require('gulp-tslint');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');

var config = {
      libraryTypeScriptDefinitions: 'typings/**/*.ts',
      tsOutputPath:  'app/scripts/',
      allJavaScript: 'app/scripts/**/*.js',
      allTypeScript: 'app/scripts/**/*.ts'
    };

gulp.task('ts-lint', function () {
    return gulp.src(config.allTypeScript)
        .pipe(tslint())
        .pipe(tslint.report('prose'));
});

gulp.task('ts', function () {
    var sourceTsFiles = [
        config.allTypeScript,                //path to typescript files
        config.libraryTypeScriptDefinitions  //reference to library .d.ts files
    ];

    var tsProject = ts.createProject('tsconfig.json');

    var tsResult = gulp.src(sourceTsFiles)
                       .pipe(sourcemaps.init())
                       .pipe(ts(tsProject));

    tsResult.dts.pipe(gulp.dest(config.tsOutputPath));
    return tsResult.js
                    .pipe(sourcemaps.write('.'))
                    .pipe(gulp.dest(config.tsOutputPath));

});

gulp.task('watch', function() {
    gulp.watch([config.allTypeScript], ['ts-lint', 'ts']);
});



gulp.task('serve', ['watch'], function() {
  gulp.src('.')
    .pipe(webserver({
      host: '0.0.0.0',
//      fallback: 'index.html',
      livereload: {
        port: 35730
      },
      open: 'index.html',
/*
      proxies: [
        {source: '/hrdemo', target: 'http://localhost:8091/hrdemo'},
        {source: '/hrdemo/jobs', target: 'http://localhost:8091/hrdemo/jobs'}
      ]
*/
      // can't rewrite the response
      middleware: [
        proxy(['/hrdemo/**'],
        {
          target: 'http://localhost:8091/',
          changeOrigin: true,
          autoRewrite: true,
          pathRewrite: { "http://localhost:8091/": "/" }
        })
      ]

    }));
});
