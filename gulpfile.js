const gulp = require("gulp");
const eslint = require("gulp-eslint");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const sass = require('gulp-sass');
const concatcss = require('gulp-concat-css');
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const file = require('gulp-file');
const path = require('path');
const inject = require('gulp-inject');
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("autoprefixer");
const browserSync = require('browser-sync').create();
const reload      = browserSync.reload;
const { minify } = require('html-minifier');

const destFolder = "./dist";

const js = [
    'node_modules/jquery/dist/jquery.min.js',
    './src/chat.js'
];

function tJs() {
    return gulp.src(js)
        .pipe(concat("chat.js"))
        .pipe(rename('bbco-chat.js'))
        .pipe(gulp.dest(destFolder))
        .pipe(browserSync.stream());
}

function tBuildJs() {
    return gulp.src("./dist/bbco-chat.js")
        .pipe(uglify())
        .pipe(rename('bbco-chat.min.js'))
        .pipe(gulp.dest(destFolder));
}

function tData() {
    return gulp.src(['./src/fakeauth_2.json'])
        .pipe(gulp.dest(destFolder+'/json'));
}

function tHtml() {
    return gulp.src('./index.html')
        .pipe(gulp.dest(destFolder))
        .pipe(browserSync.stream());
}

function tSass() {
    return gulp.src(["./src/**/*.scss"])
        .pipe(sourcemaps.init())
        .pipe(sass({includePaths: ['scss']}))
        .on("error", sass.logError)
        .pipe(concatcss('bbco-chat.css'))
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(destFolder))
        .pipe(browserSync.stream());
}

function tBuildSass() {
    return gulp.src("./dist/bbco-chat.css")
        .pipe(concat("bbco-chat.min.css"))
        .pipe(postcss([cssnano()]))
        .pipe(gulp.dest(destFolder))
}

function tAssets() {
    return gulp.src(['./src/*.svg'])
        .pipe(gulp.dest(destFolder));
}

gulp.task('build-js', gulp.series(tJs, tBuildJs));
gulp.task('build-css', gulp.series(tSass, tBuildSass));
gulp.task("build", gulp.parallel('build-js', 'build-css'));

gulp.task('compile', gulp.parallel(tHtml, tJs, tData, tSass));

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('compile', function () {
    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch(["./src/*.js"], gulp.parallel(tJs));
    gulp.watch(["./index.html"], gulp.parallel(tHtml));
    gulp.watch(["./src/**/*.scss"], gulp.parallel(tSass));
}));

gulp.task("default", gulp.series("serve"));