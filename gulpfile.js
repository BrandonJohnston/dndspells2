/*
 * Import gulp & plug-ins
 */
var gulp = require('gulp');
var clean = require('gulp-clean');
var webserver = require('gulp-webserver');
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
 * Paths to source files
 */
var sourcePaths = {
    vendorJs: [
        "bower_components/angular/angular.js",
        "bower_components/angular-ui-router/release/angular-ui-router.min.js",
        "bower_components/angular-sanitize/angular-sanitize.min.js",
        "bower_components/angular-animate/angular-animate.min.js",
        "bower_components/angular-translate/angular-translate.min.js",
        "bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js",
        "bower_components/angular-bootstrap/ui-bootstrap.min.js"
    ],
    vendorCss: [
        'bower_components/normalize-css/normalize.css'
    ],
    vendorFonts: [

    ],
    html: [
        'app/src/**/*.html'
    ],
    sass: [
        'app/src/static/sass/**/*.scss'
    ],
    images: [
        'app/src/static/images/**/*.jpg'
    ],
    js: [
        'app/src/**/*.constant.js',
        'app/src/**/*.module.js',
        'app/src/**/*.Module.js',    // TODO: Fix this
        'app/src/**/*.factory.js',
        'app/src/**/!(*.release).js',
        '!app/src/**/*.test.js'
    ],
    stubs: [
        'app/src/stub/**/*.json'
    ],
    i18n: [
        'app/src/i18n/*.json'
    ]
};


/*
 * Paths for dist files
 */
var distPaths = {
    distDir: 'dist',
    vendorDistDir: 'dist/vendor'
};


/*
 * Server settings
 */
var server = {
    host: 'localhost',
    port: '8080'
};


var isProd = false; // Useful for logic concerning if we're a dev build or prod build. Not currently used


/*
 * Gulp build tasks
 */
gulp.task('html', function() {
    return gulp.src(sourcePaths.html)
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(newer(distPaths.distDir))
        .pipe(minifyHTML({empty: true, spare: true}))
        .pipe(gulp.dest(distPaths.distDir))
});


gulp.task('sass', function() {
    return eventStream.merge(
        compileSass(sourcePaths.sass, distPaths.distDir + '/static', 'dnd.css'),
        compileSass(sourcePaths.sass, distPaths.distDir + '/static', 'dnd.min.css', true)
    );
});


gulp.task('images', function() {
    return gulp.src(sourcePaths.images)
        .pipe(gulp.dest(distPaths.distDir + '/static/images'))
});


gulp.task('js', function() {
    return eventStream.merge(
        compileJsAndMaybeHtml(
            sourcePaths.js,
            distPaths.distDir,
            'dnd-ui.js',
            false,
            true,
            ''
        ),
        compileJsAndMaybeHtml(
            sourcePaths.js,
            distPaths.distDir,
            'dnd-ui.min.js',
            true, //I minify things!
            false,
            ''
        )
    );
});


gulp.task('stubs', function() {
    return gulp.src(sourcePaths.stubs)
        .pipe(gulp.dest(distPaths.distDir + '/stub'));
});


gulp.task("i18n", function() {
    return gulp.src("app/src/i18n/*.json")
        .pipe(gulp.dest(distPaths.distDir + "/i18n"))
});


gulp.task('vendor', function() {
    return eventStream.merge(
        compileJsAndMaybeHtml(sourcePaths.vendorJs, distPaths.vendorDistDir, 'vendor.js', isProd, false),
        gulp.src(sourcePaths.vendorCss)
            .pipe(concat('vendor.css'))
            .pipe(gulp.dest(distPaths.vendorDistDir)),
        gulp.src(sourcePaths.vendorFonts)
            .pipe(gulp.dest(distPaths.vendorDistDir + '/fonts'))
    );
});


gulp.task('clean', function() {
    return gulp.src(distPaths.distDir, {read: false})
        .pipe(clean());
});


gulp.task('webserver', function() {

    gulp.src('dist')
        .pipe(webserver({
            fallback: 'index.html',
            port: server.port,
            livereload: true,
            open: false
        }));
});


gulp.task('watch', function() {
    gulp.watch([sourcePaths.html], ['html']);
    gulp.watch([sourcePaths.sass], ['sass']);
    gulp.watch([sourcePaths.js, sourcePaths.stubs], ['js']);
    gulp.watch([sourcePaths.i18n], ["i18n"]);
});


gulp.task('build', ['html', 'sass', 'images', 'js', 'stubs', 'i18n', 'vendor']);


gulp.task('default', ['build', 'webserver', 'watch']);


/*
 * Helper functions
 */
function compileSass(source, destination, concatName, minify) {
    return gulp.src(source, { base: 'src' })
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(sass())
        .pipe(gulpif(minify, minifyCSS()))
        .pipe(concat(concatName))
        .pipe(gulp.dest(destination + '/sass'))
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
            prefix: prefix
        })))
        .pipe(sourcemaps.init())
        .pipe(gulpif(minify, uglify({mangle: false})))
        .pipe(concat(concatName))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(destination))
}
