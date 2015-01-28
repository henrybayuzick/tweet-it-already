var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	sass = require('gulp-ruby-sass'),
	watch = require('gulp-watch');
	concat = require('gulp-concat');
	notify = require('gulp-notify');
	scsslint = require('gulp-scss-lint');


gulp.task('styles', function() {
	return gulp.src('./scss/*.scss')
		.pipe(scsslint())
		.pipe(sass({style: 'expanded'}))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))		
		.pipe(rename({suffix:'.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('./css'))
		.pipe(notify({message: "Styles task completed."}));
});

gulp.task('scripts', function() {
	return gulp.src(['./js/vendor/*.js','./js/main.js'])
		.pipe(concat('all.js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('./js'))
		.pipe(notify({message: "Scripts task completed."}));
});

gulp.task('watch', function() {
	gulp.watch(['./scss/*.scss','./scss/partials/*.scss'], ['styles']);
	gulp.watch(['./js/main.js','./js/vendor/*.js'], ['scripts']);
})

gulp.task('default', function() {
	gulp.start('styles', 'scripts');
});