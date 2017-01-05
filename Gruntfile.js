'use strict';

module.exports = function(grunt) {

	grunt.initConfig({

		ngdocs: {
			options: {
				dest: 'docs',
				scripts: [
					'dist/bundle.js',
					'node_modules/angular-animate/angular-animate.min.js',
					'node_modules/prismjs/prism.js'
				],
				styles: [
					'node_modules/prismjs/themes/prism-okaidia.css'
				],
				html5Mode: false,
				editExample: false
			},
			api: {
				src: ['src/**/*.js'],
				title: 'API Documentation'
			}
		},
		clean: {
			ngdocs: ['partials/', 'js/', 'font/', 'css/']
		}
	});

	grunt.loadNpmTasks('grunt-ngdocs');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('docs', [
		'ngdocs',
		'clean:ngdocs'
	]);
};
