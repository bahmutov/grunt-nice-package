/*
 * grunt-nice-package
 * https://github.com/bahmutov/grunt-nice-package
 *
 * Copyright (c) 2013 Gleb Bahmutov
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    nice_package: {
      all: {
        options: {
          version: function (value) {
            console.log('value should be version', value);
            return (/\d{1,2}\.\d{1,2}\.\d{1,2}/).test(value);
          }
        }
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'nice_package']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
