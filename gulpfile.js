
/*
 * Import gulp & plug-ins
 */
var gulp = require('gulp');
var clean = require('gulp-clean');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var eventStream = require('event-stream');
var plumber = require('gulp-plumber');
var gulpif = require('gulp-if');
var notify = require('gulp-notify');
var newer = require('gulp-newer');
var html2js = require('gulp-html2js');
var sourcemaps = require('gulp-sourcemaps');


/*
 * File paths
 */
var srcStubs = ['app/src/stub/**/*.json'];
var srcHtml = ['app/src/**/*.html'];
var srcSass = ['app/src/static/sass/**/*.scss'];
var srcImages = ['app/src/static/images/**/*.jpg'];
var srcJs = [
    'app/src/**/*.constant.js',
    'app/src/**/*.module.js',
    'app/src/**/*.Module.js',    // TODO: Fix this
    'app/src/**/*.factory.js',
    'app/src/**/!(*.release).js',
    '!app/src/**/*.test.js'
];


/*
 * Distro directories
 */
var distDirectory = 'dist';
var vendorDistDirectory = distDirectory + '/vendor';


// Add all your 3rd party JS libraries here. Relative paths to your project root.
var vendorSrcJs = [
    "bower_components/angular/angular.js",
    //"bower_components/angular-route/angular-route.min.js",
    "bower_components/angular-ui-router/release/angular-ui-router.min.js",
    "bower_components/angular-sanitize/angular-sanitize.min.js",
    "bower_components/angular-animate/angular-animate.min.js",
    "bower_components/angular-translate/angular-translate.min.js",
    "bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js",
    "bower_components/angular-bootstrap/ui-bootstrap.min.js"
];

// Add all your 3rd party CSS libraries here. Relative paths to your project root.
var vendorSrcCss = [
    //"bower_components/angular/angular-csp.css",

];


var vendorSrcFonts = [

];


var srcI18n = 'app/src/i18n/*.json';


var isProd = false; // Useful for logic concerning if we're a dev build or prod build. Not currently used


/*
 * Gulp build tasks
 */
gulp.task('default', ['connect', 'watch']);


gulp.task('build', ['stubs', 'images', 'sass', 'html', 'js', 'vendor', 'i18n']);


gulp.task('connect', function() {
    connect.server({
        root: 'dist',
        livereload: true
    });
});


gulp.task('watch', ['build'], function() {
    gulp.watch([srcHtml], ['html']);
    gulp.watch([srcSass], ['sass']);
    gulp.watch([srcJs, srcStubs], ['js']);
    gulp.watch([srcI18n], ["i18n"]);
});


gulp.task('stubs', function() {
    gulp.src(srcStubs)
        .pipe(gulp.dest(distDirectory + '/stub'));
});


gulp.task('images', function() {
    gulp.src(srcImages)
        .pipe(gulp.dest(distDirectory + '/static/images'))
});


gulp.task('html', function() {
    return eventStream.merge(
        compileHtml(srcHtml, distDirectory)
            .pipe(connect.reload())
    );
});


gulp.task('sass', function() {
    return eventStream.merge(
        compileSass(srcSass, distDirectory + '/static', 'dnd.css'),
        compileSass(srcSass, distDirectory + '/static', 'dnd.min.css', true)
    );
});


gulp.task('js', function() {
    return eventStream.merge(
        compileJsAndMaybeHtml(
            srcJs,
            distDirectory,
            'dnd-ui.js',
            false,
            true,
            ''
        ),
        compileJsAndMaybeHtml(
            srcJs,
            distDirectory,
            'dnd-ui.min.js',
            true, //I minify things!
            false,
            ''
        )
    );
});


gulp.task("i18n", function() {
    return gulp.src("app/src/i18n/*.json")
        .pipe(gulp.dest(distDirectory + "/i18n"))
});


gulp.task('clean', function() {
    return gulp.src(distDirectory, {read: false})
        .pipe(clean());
});


gulp.task('vendor', function() {
    return eventStream.merge(
        compileJsAndMaybeHtml(vendorSrcJs, vendorDistDirectory, 'vendor.js', isProd, false),
        gulp.src(vendorSrcCss)
            .pipe(concat('vendor.css'))
            .pipe(gulp.dest(vendorDistDirectory)),
        gulp.src(vendorSrcFonts)
            .pipe(gulp.dest(vendorDistDirectory + '/fonts'))
    );
});


/*
 * Helper functions
 */
function compileHtml(source, destination) {
    //we will always minify html because the dev console will prettify it
    return gulp.src(source)
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(newer(distDirectory))
        .pipe(minifyHTML({empty: true, spare: true}))
        .pipe(gulp.dest(destination))
}


function compileSass(source, destination, concatName, minify, hideErrors) {
    return gulp.src(source, { base: 'src' })
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(sass())
        // .pipe(sass({errLogToConsole: true})) // DEV ONLY: Don't die during watch() when error in .csss file
        //.pipe(gulpif(hideErrors, csslint.reporter()))
        .pipe(gulpif(minify, minifyCSS()))
        .pipe(concat(concatName))
        .pipe(gulp.dest(destination+"/sass"))
}


function compileJsAndMaybeHtml(source, destination, concatName, minify, showErrors, prefix) {
    return gulp.src(source)
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(gulpif(/[.]html$/, minifyHTML({
            empty: true,
            quotes: true,
            spare: true
        })))
        .pipe(gulpif(/[.]html$/, html2js({
            moduleName: 'dnd-ui',
            moduleName: 'dnd-ui',
            prefix: prefix
        })))
        .pipe(sourcemaps.init())
        .pipe(gulpif(minify, uglify({mangle: false})))
        .pipe(concat(concatName))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(destination))
}
