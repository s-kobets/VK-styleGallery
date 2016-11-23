var gulp = require('gulp');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');

var path = {
    public: {
        css: 'public/css/',
        js: 'public/js/'
    },
    src: {
        css: 'static_src/css/*.css',
        js: 'static_src/js/*.js'
    },
    watch: {
        css: 'static_src/css/**/*.css',
        js: 'static_src/js/**/*.js'
    }
};

gulp.task('style', function () {
    var postcss    = require('gulp-postcss');
    return gulp.src(path.src.css)
        .pipe( postcss([ require('precss') ]) )
        .pipe(gulp.dest(path.public.css));
});

gulp.task('script', function () {
    return gulp.src(path.src.js)
        .pipe(uglify({
            compress: {
                drop_console: true
            }
        }))
        .pipe(gulp.dest(path.public.js));
});

gulp.task('build', ['style', 'script']);

gulp.task('default', ['build', 'watch']);

gulp.task('watch', function () {
    watch([path.watch.css], function () {
        gulp.start('style');
    });
    watch([path.watch.js], function () {
        gulp.start('script');
    });
});