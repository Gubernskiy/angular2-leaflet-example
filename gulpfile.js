var gulp = require('gulp'),
    flatten = require('gulp-flatten'),
    less = require('gulp-less'),
    path = require('path'),
    inlineNg2Template = require('gulp-inline-ng2-template'),
    runSequence = require('run-sequence'),
    sourcemaps = require('gulp-sourcemaps'),
    tscConfig = require('./tsconfig.json'),
    tsc = require('gulp-typescript'),
    del = require('del'),
    Builder = require('systemjs-builder'),
    replace = require('gulp-replace');


var appDev = "src";
var appProd = "dist";

// Bundle dependencies into vendors file
gulp.task('css', ["less"], function () {
    return gulp.src([
        'node_modules/leaflet/dist/leaflet.css',
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/ng2-dnd/bundles/style.css',
        "src/css/styles.css"])
        .pipe(flatten())
        .pipe(gulp.dest(appProd + "/css"));
});

/** add all remote js */
gulp.task("libs", function () {
    return gulp.src([
        'node_modules/angular2-ie9-shims/shims_for_IE.prod.js',
        'node_modules/core-js/client/shim.min.js',
        'node_modules/zone.js/dist/zone.min.js',
        'node_modules/rxjs/bundles/Rx.min.js',
        'node_modules/leaflet/dist/leaflet.js',
        'node_modules/reflect-metadata/Reflect.js'
    ])
        .pipe(flatten())
        .pipe(gulp.dest(appProd + "/libs"));
});

gulp.task('less', function () {
    gulp.src(appDev + '/app/**/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest(appDev + '/app'));

    return gulp.src(appDev+'/less/styles.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest(appDev + '/css'));
});

gulp.task('templateReplace', ['copyAppFolder'], function () {
    return gulp.src([appDev + '/app/**/*.ts'])
        .pipe(inlineNg2Template({useRelativePaths: true, removeLineBreaks: true}))
        .pipe(gulp.dest(appDev + '/app'));
});

/** make copy folders with components */
gulp.task("copyAppFolder", function () {
    return gulp.src([appDev + '/app/**/*'])
        .pipe(gulp.dest(appDev + '/copyApp'));
});

/** return all files to prebuild view */
gulp.task("resetApp", function () {
    return gulp.src([appDev + '/copyApp/**/*'])
        .pipe(gulp.dest(appDev + '/app'));
});

gulp.task('compile', function () {
    var r = gulp.src([appDev + '/app/**/*.ts'])
        .pipe(sourcemaps.init())
        .pipe(tsc(tscConfig.compilerOptions));

    r.dts.pipe(gulp.dest(appDev + "/app"));
    r.js.pipe(gulp.dest(appDev + "/app"));

    return r.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(appDev + "/app"));
});


gulp.task('clean', function () {
    return del.sync([appProd + '/css', appProd + '/libs', appProd + '/js', appProd + '/TEST_DATA']);
});

gulp.task('delCopy', ['resetApp'], function (cb) {
    del.sync([appDev + '/copyApp']);
    setTimeout(function () {
        cb();
    });
});


gulp.task("preBuild", ['templateReplace'], function () {
    return gulp.src(['systemjs.config.js'])
        .pipe(replace('/src/app', 'src/app'))
        .pipe(gulp.dest('./'));
    console.log("pre building ..........");
});

gulp.task("afterBuild", function () {
    return gulp.src(['systemjs.config.js'])
        .pipe(replace('src/app', '/src/app'))
        .pipe(gulp.dest('./'));
    console.log("after building ..........");
});

/** bundle */
gulp.task('bundle', ["libs", "css"], function () {
    var builder = new Builder('', 'systemjs.config.js');
    return builder
        .buildStatic(appDev + '/app/main.js', appProd + '/js/bundle.js', {minify: false, sourceMaps: false})
        .then(function () {
            console.log('Build complete');
        })
        .catch(function (err) {
            console.log('Build error');
            console.log(err);
        });
});

gulp.task('build', function (callback) {
    runSequence('clean', 'preBuild', 'compile', 'bundle', 'afterBuild', 'delCopy', callback);
});