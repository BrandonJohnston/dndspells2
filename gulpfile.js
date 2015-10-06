
/*
 * Import gulp & plug-ins
 */
var gulp = require('gulp');
var clean = require("gulp-clean");
var uglify = require("gulp-uglify");
var minifyCSS = require("gulp-minify-css");
var minifyHTML = require("gulp-minify-html");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var eventStream = require("event-stream");
var plumber = require('gulp-plumber');
var gulpif = require('gulp-if');
var notify = require("gulp-notify");
var newer = require('gulp-newer');
var html2js = require('gulp-html2js');
var sourcemaps = require('gulp-sourcemaps');


/*
 * File paths
 */
var srcStubs = ["app/src/stub/**/*.json"];
var srcHtml = ["app/src/**/*.html"];
var srcSass = ["app/src/static/sass/**/*.scss"];
var srcImages = ["app/src/static/images/**/*.svg"];
var srcJs = [
	"app/src/**/*.constant.js",
	"app/src/**/*.module.js",
	"app/src/**/*.factory.js",
	"app/src/**/!(*.release).js",
	"!app/src/**/*.test.js"
];


/*
 * Distro directories
 */
var distDirectory = "dist";
var vendorDistDirectory = distDirectory + "/vendor";


// Add all your 3rd party JS libraries here. Relative paths to your project root.
var vendorSrcJs = [
	"bower_components/angular/angular.min.js"
];

// Add all your 3rd party CSS libraries here. Relative paths to your project root.
var vendorSrcCss = [

];


var isProd = false; // Useful for logic concerning if we're a dev build or prod build. Not currently


/*
 * Gulp build tasks
 */
gulp.task('default', ["watch"]);


gulp.task("build", ["stubs", "images", "sass", "html", "js", "vendor"]);


gulp.task("watch", ["build"], function() {
	gulp.watch([srcHtml], ["html"]);
	gulp.watch([srcSass], ["sass"]);
	gulp.watch([srcJs, srcStubs], ["js"]);
});


gulp.task("stubs", function() {
	gulp.src(srcStubs)
		.pipe(gulp.dest(distDirectory + "/stub"));
});


gulp.task("images", function() {
	gulp.src(srcImages)
		.pipe(gulp.dest(distDirectory + "/static/images"))
});


gulp.task("html", function() {
	return eventStream.merge(
		compileHtml(srcHtml, distDirectory)
	);
});


gulp.task("sass", function() {
	return eventStream.merge(
		compileSass(srcSass, distDirectory + "/static", "dndspells.css"),
		compileSass(srcSass, distDirectory + "/static", "dndspells.min.css", true)
	);
});


gulp.task("js", function() {
	return eventStream.merge(
		compileJsAndMaybeHtml(
			srcJs,
			distDirectory,
			"dndspells.js",
			false,
			true,
			""
		),
		compileJsAndMaybeHtml(
			srcJs,
			distDirectory,
			"dndspells.min.js",
			true, //I minify things!
			false,
			""
		)
	);
});


gulp.task("clean", function() {
	return gulp.src(distDirectory, {read: false})
		.pipe(clean());
});



gulp.task("vendor", function() {
	return eventStream.merge(
		compileJsAndMaybeHtml(vendorSrcJs, vendorDistDirectory, "vendor.js", isProd, false),
		gulp.src(vendorSrcCss)
			.pipe(concat("vendor.css"))
			.pipe(gulp.dest(vendorDistDirectory))//,
		//gulp.src(vendorSrcFonts)
		//	.pipe(gulp.dest(vendorDistDirectory + "/fonts"))
	);
});


/*
 * Helper functions
 */
function compileHtml(source, destination) {
	//we will always minify html because the dev console will prettify it
	return gulp.src(source)
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(newer(distDirectory))
		.pipe(minifyHTML({empty: true, spare: true}))
		.pipe(gulp.dest(destination))
}


function compileSass(source, destination, concatName, minify, hideErrors) {
	return gulp.src(source, { base: 'src' })
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(sass())
		// .pipe(sass({errLogToConsole: true})) // DEV ONLY: Don't die during watch() when error in .csss file
		//.pipe(gulpif(hideErrors, csslint.reporter()))
		.pipe(gulpif(minify, minifyCSS()))
		.pipe(concat(concatName))
		.pipe(gulp.dest(destination+"/sass"))
}


function compileJsAndMaybeHtml(source, destination, concatName, minify, showErrors, prefix) {
	return gulp.src(source)
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(gulpif(/[.]html$/, minifyHTML({
			empty: true,
			quotes: true,
			spare: true
		})))
		.pipe(gulpif(/[.]html$/, html2js({
			moduleName: "dndspells",
			prefix: prefix
		})))
		.pipe(sourcemaps.init())
		.pipe(gulpif(minify, uglify({mangle: false})))
		.pipe(concat(concatName))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(destination))
}