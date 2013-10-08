/*
 * grunt-nice-package
 * https://github.com/bahmutov/grunt-nice-package
 *
 * Copyright (c) 2013 Gleb Bahmutov
 * Licensed under the MIT license.
 */

'use strict';

var PJV = require('package-json-validator');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('nice_package', 'Opinionated package.json validator', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      // package version is a string
      version: function (value) {
        console.log('version', value, 'should be a string');
        return typeof (value) === 'string';
      }
    });

    var pkg = grunt.file.readJSON('package.json');

    var every = Object.keys(options).every(function (key) {
      grunt.verbose.writeln('checking property', key);

      var property = pkg[key];
      if (!property) {
        grunt.log.error('package.json missing', key);
        return false;
      }
      if (typeof options[key] === 'function') {
        return options[key](property);
      }

      return true;
    });

    if (!every) {
      return false;
    }

    return true;
  });

};
