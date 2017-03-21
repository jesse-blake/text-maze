var path       = require('path');
var del        = require('del');

var gulp       = require('gulp');
var sourcemaps = require('gulp-sourcemaps');

var jshint     = require('gulp-jshint');
var browserify = require('browserify');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var uglify     = require('gulp-uglify');

var sass       = require('gulp-sass');
var cssnano    = require('gulp-cssnano');

var bundle = browserify({
    entries: ['src/js/index.js'],
    debug: true // Create sourcemaps.
});

gulp.task('clean', function(done) {
    return del(['dist']); 
    done();
});

gulp.task('html', function(done) {
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));

    done();
});

// Lint, bowserify, minify and create sourcemaps for js files.
gulp.task('js',
    gulp.series(
        function jsInternalLint(done) {
            // 'since' will add files to stream that have a newer timestamp than last run.
            gulp.src(['src/js/**/*.js', 'node_modules/text-maze/lib/**/*.js'], { since: gulp.lastRun('js') })
                .pipe(jshint())
                .pipe(jshint.reporter('default'))
                .pipe(jshint.reporter('fail'));

            done();
        },
        function jsInternalMinify(done) {
            return bundle.bundle()                         // Browserify js files instead of gulp.src-ing them.
                .pipe(source('text-maze.min.js'))          // Transform text stream into vinyl objects.
                .pipe(buffer())                            // Convert vinyl stream into a buffer for uglify which requires buffers.
                .pipe(sourcemaps.init({ loadMaps: true })) // Init browserify-created source maps.
                .pipe(uglify())
                .pipe(sourcemaps.write('.'))
                .pipe(gulp.dest('dist/js'));

            done();
        }
    )
);

// Compile, minify, and create sourcemaps for sass files.
gulp.task('css', function(done) {
    gulp.src('src/css/**/*.scss')  
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'));

    done();
});

gulp.task('bootstrapAndJqueryJs', function(done) {
    gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('dist/js'));

    done();
});

gulp.task('bootstrapCss', function(done) {
    gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest('dist/css'));

    done();
});

gulp.task('bootstrapFonts', function(done) {
    gulp.src('node_modules/bootstrap/dist/fonts/*.*')
        .pipe(gulp.dest('dist/fonts'));

    done();
});

// Gulp runs 'default' when no task is specified on cli.
gulp.task('default',
    gulp.series(
        'clean',
        gulp.parallel('html', 'js', 'css', 'bootstrapAndJqueryJs', 'bootstrapCss', 'bootstrapFonts'),
        function watcher(done) {
            gulp.watch(['src/js/**/*.js', 'node_modules/text-maze/lib/**/*.js'], gulp.parallel('js'));
            gulp.watch('src/css/**/*.scss', gulp.parallel('css'));
            gulp.watch('src/index.html', gulp.parallel('html'));

            done();
        }
    )
);
