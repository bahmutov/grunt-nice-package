/*
 * grunt-nice-package
 * https://github.com/bahmutov/grunt-nice-package
 *
 * Copyright (c) 2013 Gleb Bahmutov
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  console.log('running grunt');

  // alias nicePackage to nice-package
  grunt.initConfig({
    nicePackage: {
      all: {
        options: {
          blankLine: true,
          version: function (value) {
            console.log('verifying version', value);
            return (/\d{1,2}\.\d{1,2}\.\d{1,2}/).test(value);
          }
        }
      }
    }
  });

  grunt.loadTasks('../../tasks');
  grunt.registerTask('default', ['nicePackage']);
};
