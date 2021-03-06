'use strict';

module.exports = function (grunt) {

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Automatically load required Grunt tasks
	require('jit-grunt')(grunt, {
		useminPrepare: 'grunt-usemin'
	});

	// Define the configuration for all the tasks
	grunt.initConfig({
	  pkg: grunt.file.readJSON('package.json'),

	  // Make sure code styles are up to par and there are no obvious mistakes
	  jshint: {
	    options: {
	      jshintrc: '.jshintrc',
	      reporter: require('jshint-stylish')
	    },
	    
	    all: {
	      src: [
	        'Gruntfile.js',
	        'app/js/{,*/}*.js'
	      ]
	    }
	  },

		useminPrepare: {
		  html: 'app/index.html',
		  options: {
		    dest: 'dist'
		  }
		},

		// Concat
		concat: {
		  options: {
		    separator: ';'
		  },
		  // dist configuration is provided by useminPrepare
		  dist: {}
		},

		// Uglify
		uglify: {
		  options: {
      	mangle: false //mangle has to be false because of the Angular ui-router injections (i.e., $location, etc)
    	},// dist configuration is provided by useminPrepare
		  dist: {}
		},

		cssmin: {
		  dist: {}
		},

		// Filerev
		filerev: {
		  options: {
		    encoding: 'utf8',
		    algorithm: 'md5',
		    length: 20
		  },
		  
		  release: {
		    // filerev:release hashes(md5) all assets (images, js and css )
		    // in dist directory
		    files: [{
		      src: [
		        'dist/js/*.js',
		        'dist/css/*.css',
		      ]
		    }]
		  }
		},
		  
		// Usemin
		// Replaces all assets with their revved version in html and css files.
		// options.assetDirs contains the directories for finding the assets
		// according to their relative paths
		usemin: {
		  html: ['dist/*.html'],
		  css: ['dist/css/*.css'],
		  options: {
		    assetsDirs: ['dist', 'dist/css']
		  }
		},

		htmlmin: {                                     // Task
	    dist: {                                      // Target
	      options: {                                 // Target options
	        removeComments: true,
	        collapseWhitespace: true
	      },
	      files: {                                   // Dictionary of files
	        'dist/index.html': 'dist/index.html',
	        'dist/views/about.html': 'dist/views/about.html',
	        'dist/views/work.html': 'dist/views/work.html',
	        'dist/views/home.html': 'dist/views/home.html'    // 'destination': 'source'
	      }
	  
	    }
	  },

		copy: {
		  dist: {
		    cwd: 'app',
		    src: [ '**','!css/**/*.css','!js/**/*.js' ],
		    dest: 'dist',
		    expand: true
		  }
		  //,
		  
		  //fonts: {
		  //  files: [
		  //    {
		        //for bootstrap fonts
		  //      expand: true,
		  //      dot: true,
		  //      cwd: 'bower_components/bootstrap/dist',
		  //      src: ['fonts/*.*'],
		  //      dest: 'dist'
		  //    }, {
		        //for font-awesome
		   //     expand: true,
		   //     dot: true,
		  //      cwd: 'bower_components/font-awesome',
		  //      src: ['fonts/*.*'],
		  //      dest: 'dist'
		  //    }
		  //  ]
		  //}
		},

		clean: {
		  build: {
		    src: [ 'dist/']
		  }
		}
	});

	grunt.registerTask('build', [
	  'clean',
	  'jshint',
	  'useminPrepare',
	  'concat',
	  'cssmin',
	  'uglify',
	  'copy',
	  'filerev',
	  'usemin',
	  'htmlmin' //has to be last since the above processes change filenames, move files, etc
	]);

	grunt.registerTask('default',['build']);

};