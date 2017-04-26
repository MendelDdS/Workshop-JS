var gulp = require('gulp');
var jshint = require('gulp-jshint');

var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var shell = require('gulp-shell')
var wait = require('gulp-wait');

var staticAnalisysFiles = ['./controllers/project.js','./controllers/room.js','./models/project.js','./models/room.js','./controllers/meeting.js'];
var staticAnalisysFoldersPMD = ['./controllers/','./models/'];
var rulesetsPMD = ['./pmd/rulesets/braces.xml','./pmd/rulesets/basic.xml','./pmd/rulesets/controversial.xml','./pmd/rulesets/unnecessary.xml'];
//gulp.task('default', ['mocha','pmd','jshint','eslint']);
gulp.task('default', ['eslint']);

gulp.task('eslint',['jshint'], function() {
				gulp.src(staticAnalisysFiles)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());

});

gulp.task('jshint',['pmd'], function() {
				gulp.src(staticAnalisysFiles)
				.pipe(jshint())
				.pipe(jshint.reporter('default'));
});


gulp.task('pmd', function() {
				gulp.src('')
				.pipe(shell(['echo The PMD report has been saved to /pmd_report.xml',
	        './pmd/bin/run.sh pmd  -d '+staticAnalisysFiles+' -f xml -rulesets ' +rulesetsPMD+' > ./pmd_report.xml'
	      ]))
				.once('error', () => {
		            process.exit(1);
		        })
		    .once('end', () => {
		            process.exit();
		        })

});


gulp.task('mocha', function() {
	gulp.src('./test/Mocha/**/*.js', {read: false})
					.pipe(mocha({reporter: 'spec'}))

});

gulp.task('getusers', function() {
	gulp.src('')
	.pipe(shell(['ssh  root@150.165.11.137 "crawler/script.sh" > user-populate.txt']))
	.once('error', () => {
	        process.exit(1);
	    })
	  .once('end', () => {
	        process.exit();
	    })

});
