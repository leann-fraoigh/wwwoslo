"use strict";

var gulp = require("gulp");
var cheerio = require("gulp-cheerio");
var del = require("del");
var sass = require("gulp-sass");
var htmlmin = require("gulp-htmlmin");
var imagemin = require ("gulp-imagemin");
var include = require ("posthtml-include");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var posthtml = require("gulp-posthtml");
var pump = require("pump");
var rename = require("gulp-rename");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var svgstore = require("gulp-svgstore");
var csso = require("gulp-csso");
var uglify = require("gulp-uglify");
var webp = require("gulp-webp");

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss", { allowEmpty: true })
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch(["source/img/icon-*.svg"], gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/js/*.js", gulp.series("js", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("refresh", function(done) {
  server.reload();
  done();
});

gulp.task ("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true}),
    imagemin.svgo()
  ]))
});

gulp.task ("webp", function () {
  return gulp.src("source/img/**/*.{png.jpg}")
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("source/img"));
});

gulp.task ("sprite", function () {
  return gulp.src([
    "source/img/icon-*.svg"
  ])
  .pipe(cheerio({
    run: function ($) {
      $('[fill]').removeAttr('fill');
    },
    parserOptions: { xmlMode: true}
  }))
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img"));
});

// <include src="build/..."></include>
gulp.task("html", function () {
  return gulp.src("source/*.html")
  // .pipe(posthtml([
  //   include()
  // ]))
  .pipe(htmlmin({
    collapseWhitespace: true
  }))
  .pipe(gulp.dest("build"));
});

gulp.task("js", function (cb) {
  pump ([
    gulp.src("source/js/*.js"),
    uglify(),
    rename(function (path) {
      path.basename += ".min";
    }),
    gulp.dest("build/js")
    ],
    cb
  );
});

gulp.task("copy", function () {
  return gulp.src([
    "source/*.html",
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**"
    // "source/js/**"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "sprite",
  "js",
  "html"
));

gulp.task("start", gulp.series("build", "server"));
