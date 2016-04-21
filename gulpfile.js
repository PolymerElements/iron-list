'use strict';

const closureCompiler = require('google-closure-compiler').gulp();
const cripser = require('gulp-crisper');
const gulp = require('gulp');
const gulpif = require('gulp-if');

let deps = [
  "bower_components/iron-resizable-behavior/iron-resizable-behavior.html",
  "bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html",
  "bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html",
]

let jsDeps = deps.map((path) => path.replace(/\.html$/, '.js'));

gulp.task('compile', function () {
  return gulp.src(deps.concat(["iron-list.html"]))
      .pipe(cripser({
        onlySplit: true,
      }))
      .pipe(gulpif(/.*\.js$/ , closureCompiler({
          compilation_level: 'ADVANCED',
          warning_level: 'VERBOSE',
          hide_warnings_for: jsDeps,
          language_in: 'ECMASCRIPT6_STRICT',
          language_out: 'ECMASCRIPT5_STRICT',
          externs: 'bower_components/polymer-externs/polymer-externs.js',
          polymer_pass: true,
          jscomp_error: [
              "checkTypes",
              "checkVars",
              "undefinedNames",
              "undefinedVars",
              "unknownDefines",
              "globalThis",
              "nonStandardJsDocs"],
          extra_annotation_name: [
              "attribute",
              "demo",
              "hero",
              "status",
              "element",
              "homepage",
              "submodule",
              "group"],
        })));
});
