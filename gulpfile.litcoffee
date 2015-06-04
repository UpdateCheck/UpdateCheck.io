UpdateCheck.io Gulpfile
=======================

## Load Config

    config = require('./gulp.config.json');

## Dependencies

#### Base Deps

    gulp = require 'gulp'
    concat = require 'gulp-concat'

#### Gulp Utils

    livereload = require 'gulp-livereload'
    plumber = require 'gulp-plumber'
    notify = require 'gulp-notify'

#### Browser Utilities

    uglify = require 'gulp-uglify'
    autoprefixer = require 'gulp-autoprefixer'

#### Pre-compilers

    sass = require 'gulp-sass'
    coffee = require 'gulp-coffee'

#### Transpilers

    babel = require 'gulp-babel'

#### Angular Specific Utilities

    angularFilesort = require 'gulp-angular-filesort'
    ngAnnotate = require 'gulp-ng-annotate'
    templateCache = require 'gulp-angular-templatecache'

## Tasks

SCSS Compilation

    gulp.task 'css', () ->
        gulp.src config.css.sass.src
        .pipe plumber({errorHandler: notify.onError("Error: <%= error.message %>")})
        .pipe sass()
        .pipe autoprefixer config.css.autoprefixerConfig
        .pipe gulp.dest config.css.dest
        .pipe notify 'Application SCSS has been compiled'

    gulp.task 'css:vendor', () ->
        gulp.src config.css.sass.vendorSrc
        .pipe plumber({errorHandler: notify.onError("Error: <%= error.message %>")})
        .pipe sass()
        .pipe autoprefixer config.css.autoprefixerConfig
        .pipe gulp.dest config.css.dest
        .pipe notify 'Vendor SCSS has been compiled'

Copy fonts

    gulp.task 'copy:fonts', () ->
        gulp.src config.fonts.src
        .pipe gulp.dest config.fonts.dest

Copy Angular Templates

    gulp.task 'copy:templates', () ->
        gulp.src config.angular.templates.src
        .pipe templateCache config.angular.templates.params
        .pipe gulp.dest('public/builds')

Coffee Compilation

    gulp.task 'js', () ->
        gulp.src config.js.es6.src
        .pipe plumber({errorHandler: notify.onError("Error: <%= error.message %>")})
        .pipe babel()
        .pipe ngAnnotate()
        .pipe angularFilesort()
        .pipe concat 'app.js'
        .pipe gulp.dest config.js.es6.dest
        .pipe notify 'Application JS has been transpiled'


    gulp.task 'js:vendor', () ->
        gulp.src config.js.es5.vendorSrc
        .pipe plumber({errorHandler: notify.onError("Error: <%= error.message %>")})
        .pipe concat config.js.es5.concat
        .pipe gulp.dest config.js.es5.dest

Realtime Compilation

    gulp.task 'watch', ['build'], () ->
        livereload.listen();

        gulp.watch('resources/assets/stylesheets/**/*.scss', ['css'])
        gulp.watch('resources/assets/stylesheets/vendor.scss', ['css:vendor'])
        gulp.watch('resources/assets/stylesheets/_base.scss', ['css', 'css:vendor'])
        gulp.watch('resources/assets/scripts/**/*.js', ['js'])
        gulp.watch('resources/assets/templates/**/*.html', ['copy:templates'])
        gulp.watch('app/views/**').on 'change', livereload.changed
        gulp.watch('public/builds/**').on 'change', livereload.changed
        gulp.watch('resources/assets/templates/**').on 'change', livereload.changed

Build everything!

    gulp.task 'build', ['css', 'css:vendor', 'js', 'js:vendor', 'copy:fonts', 'copy:templates']
    # Not much else to do here - everything has already run!

Default Task

    gulp.task 'default', ['build'] # All we do is call build!